import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import paymentSlice from '../../../state/features/paymentSlice';
import SkeletonLoader from '../../../components/dashboard/SkeletonLoader';
import Pagination2 from '../../../components/Pagination2';
import PaymentsManagmentNavbar from '../../../components/Admin/Payments/PaymentsManagmentNavbar';
import NewPaymentSettings from '../../../components/technician/payments/NewPaymentSettings';
import { formatDateTime } from '../../../helpers/time';

const PaymentSettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);

  const PER_PAGE = 10;
  const TABLE_COLUMNS = 7;

  const [showNewPaymentSetting, setShowNewPaymentSettingModal] =
    useState(false);

  const totalPages = Math.ceil(data.length / PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return data.slice(start, start + PER_PAGE);
  }, [data, currentPage]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await paymentSlice.findPaymentSettings();

      if (response.status === 200) {
        setData(response.data.settings);
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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-center" richColors />
      <PaymentsManagmentNavbar />
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">
          Payments Settings
        </h1>
        <div className="py-2">
          <button
            onClick={() => setShowNewPaymentSettingModal(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <FaPlus className="text-lg" />
            <span>New Settings</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              {['#', 'Service Fee', 'Transaction Fee Rate', 'Start time'].map(
                (header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
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
                    {item.serviceFee}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {item.transactionFeeRate}%
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {formatDateTime(item.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={TABLE_COLUMNS}
                  className="p-8 text-center text-gray-400"
                >
                  📭 No payments settings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!loading && data.length > 0 && (
        <div className="mt-6">
          <Pagination2
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {showNewPaymentSetting && (
        <NewPaymentSettings
          onClose={() => setShowNewPaymentSettingModal(false)}
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

export default PaymentSettings;
