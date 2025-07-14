import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import {
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaPlus,
  FaFilter,
  FaChevronDown,
} from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import paymentSlice from '../../../state/features/paymentSlice';
import RequestPayment from '../../../components/technician/payments/RequestPayment';
import SkeletonLoader from '../../../components/dashboard/SkeletonLoader';
import Pagination2 from '../../../components/Pagination2';
import PaymentsManagmentNavbar from '../../../components/Admin/Payments/PaymentsManagmentNavbar';
import { formatCurrency } from '../../../helpers/textFormatting';

const StatusBadge = memo(({ status }: { status: string }) => {
  const statusStyles: any = {
    pending: 'text-yellow-500',
    paid: 'text-green-500',
    failed: 'text-red-500',
  };

  return (
    <span className={`${statusStyles[status] ?? 'text-gray-500'} font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
});

const Payments = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [data, setData] = useState<any[]>([]);

  const PER_PAGE = 10;
  const TABLE_COLUMNS = 7;

  const [searchColumn, setSearchColumn] = useState('technician');
  const [searchQuery, setSearchQuery] = useState('');

  const searchColumnLabels: any = {
    technician: 'Technician Name',
    payer: 'Payer',
    requestedAmount: 'Requested amount',
    receivedAmount: 'Received amount',
    Fees: 'Fees',
    note: 'Note',
    status: 'Status',
  };

  const filteredData = useMemo(() => {
    return data
      .filter((item) => {
        const searchTerm = searchQuery.toLowerCase();
        switch (searchColumn) {
          case 'technician':
            return `${item.technician?.firstName} ${item.technician?.lastName}`
              .toLowerCase()
              .includes(searchTerm);
          case 'payer':
            return item.payer.toLowerCase().includes(searchTerm);
          case 'amount':
            return item.amount.toString().includes(searchTerm);
          case 'note':
            return item.note.toLowerCase().includes(searchTerm);
          case 'status':
            return item.status.toLowerCase().includes(searchTerm);
          default:
            return true;
        }
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [data, searchQuery, searchColumn, sortOrder]);
  const totalPages = Math.ceil(filteredData.length / PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredData.slice(start, start + PER_PAGE);
  }, [filteredData, currentPage]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await paymentSlice.findAllTechniciansPayments();
      if (response.status === 200) {
        setData(response.data.techniciansPayments);
      } else {
        setError('Failed to fetch payments data');
        toast.error('Payment data load failed');
      }
    } catch (err) {
      setError('Network error - please check your connection');
      toast.error('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const [latestSetting, setLatestSetting] = useState<any>();
  const fetchPaymentSettings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await paymentSlice.findPaymentSettings();
      if (response.status === 200) {
        setLatestSetting(response.data.settings[0]);
      } else {
        setError('Failed to fetch payments data');
        toast.error('Payment data load failed');
      }
    } catch (err) {
      setError('Network error - please check your connection');
      toast.error('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaymentSettings();
  }, []);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-center" richColors />
      <PaymentsManagmentNavbar />
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">
          Technicians Payments
        </h1>

        <div className="flex flex-col gap-3 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative flex-1">
              <select
                value={searchColumn}
                onChange={(e) => setSearchColumn(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="technician">Technician Name</option>
                <option value="payer">Payer</option>
                <option value="requested Amount">Amount</option>
                <option value="note">Note</option>
                <option value="status">Status</option>
              </select>
              <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
              <FaChevronDown className="absolute right-3 top-3.5 text-gray-400 text-sm" />
            </div>

            <div className="relative flex-[2]">
              <input
                type="search"
                placeholder={`Search by ${searchColumnLabels[searchColumn]}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative flex-1">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">
                  <FaSortAmountDown className="mr-2" />
                  Oldest First
                </option>
                <option value="desc">
                  <FaSortAmountUp className="mr-2" />
                  Newest First
                </option>
              </select>
              <FaSortAmountDown className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <FaPlus className="text-lg" />
              <span>New Payment</span>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              {[
                '#',
                'Technician',
                'Payer',
                'Requested amount',
                'Received amount',
                'Fees',
                'Note',
                'Status',
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <SkeletonLoader rows={PER_PAGE} cols={TABLE_COLUMNS} />
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {(currentPage - 1) * PER_PAGE + index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.technician?.firstName} {item.technician?.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.payer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {formatCurrency(item.requestedAmount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {formatCurrency(item.receivedAmount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {formatCurrency(item.serviceFee * 100)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">
                    {item.note}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2"></td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={TABLE_COLUMNS}
                  className="p-8 text-center text-gray-400"
                >
                  📭 No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!loading && filteredData.length > 0 && (
        <div className="mt-6">
          <Pagination2
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {showPaymentModal && (
        <RequestPayment
          setting={latestSetting}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={async () => {
            await fetchData();
            toast.success('Payment request submitted successfully');
          }}
        />
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default Payments;
