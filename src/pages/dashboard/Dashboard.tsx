import { useEffect, useMemo, useState } from 'react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import paymentSlice from '../../state/features/paymentSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FiRefreshCw } from 'react-icons/fi';
import Pagination2 from '../../components/Pagination2';
import AdminWithdrawMoney from '../../components/dashboard/AdminWithdrawMoney';
export const PAYPACK_TRANSACTION_FEE = 2.3;
const CURRENCY = 'RWF';
const DEFAULT_YEAR = new Date().getFullYear();

const processChartData = (data: any[]) => {
  const monthlyData: { [key: string]: { income: number; outcome: number } } =
    {};

  data.forEach((transaction) => {
    try {
      const date = new Date(transaction.createdAt);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${month}`;

      if (!monthlyData[key]) {
        monthlyData[key] = { income: 0, outcome: 0 };
      }

      if (transaction.type === 'in') {
        monthlyData[key].income += transaction.netIncome;
      } else {
        monthlyData[key].outcome += transaction.netIncome;
      }
    } catch (error) {
      console.error('Invalid date format:', transaction.createdAt);
    }
  });

  return Object.entries(monthlyData).map(([key, values]) => {
    const [year, month] = key.split('-');
    return {
      year: parseInt(year),
      month: parseInt(month),
      monthName: format(new Date(parseInt(year), parseInt(month)), 'MMM'),
      ...values,
    };
  });
};

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalIns, setTotalIns] = useState(0);
  const [totalOuts, setTotalOuts] = useState(0);
  const [remainingIncome, setRemainingIncome] = useState(0);
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [percentageChanges, setPercentageChanges] = useState({
    income: 0,
    outcome: 0,
  });
  const [techBalance, setTechBalance] = useState<any>(0);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [totalPays, setTotalPays] = useState(0);

  const chartData = useMemo(() => {
    const processed = processChartData(data);
    return processed
      .filter((item) => item.year === selectedYear)
      .sort((a, b) => a.month - b.month)
      .map((item) => ({
        ...item,
        name: `${item.monthName} ${item.year}`,
      }));
  }, [data, selectedYear]);

  const availableYears = useMemo(() => {
    const years = new Set<number>([DEFAULT_YEAR]);
    data.forEach((transaction: any) => {
      try {
        years.add(new Date(transaction.createdAt).getFullYear());
      } catch (error) {
        console.error('Invalid date format:', transaction.createdAt);
      }
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [data]);

  const completeChartData = useMemo(() => {
    return Array.from({ length: 12 }).map((_, month) => {
      const existing = chartData.find((d) => d.month === month);
      return (
        existing || {
          name: format(new Date(selectedYear, month), 'MMM'),
          income: 0,
          outcome: 0,
          month,
          year: selectedYear,
        }
      );
    });
  }, [chartData, selectedYear]);

  const calculatePercentageChanges = (currentData: any[]) => {
    const now = new Date();
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    const lastMonthData = currentData.filter((item) => {
      try {
        const date = new Date(item.createdAt);
        return date >= lastMonthStart && date <= lastMonthEnd;
      } catch {
        return false;
      }
    });

    const lastMonthIncome = lastMonthData
      .filter((item) => item.type === 'in')
      .reduce((acc, item) => acc + item.netIncome, 0);

    const lastMonthOutcome = lastMonthData
      .filter((item) => item.type === 'out')
      .reduce((acc, item) => acc + item.netIncome, 0);

    const incomeChange = lastMonthIncome
      ? ((totalIns - lastMonthIncome) / lastMonthIncome) * 100
      : 0;

    const outcomeChange = lastMonthOutcome
      ? ((totalOuts - lastMonthOutcome) / lastMonthOutcome) * 100
      : 0;

    return {
      income: Number(incomeChange.toFixed(1)),
      outcome: Number(outcomeChange.toFixed(1)),
    };
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await paymentSlice.getSystemsIncomes();
      const systemIncomes = res?.data?.systemIncomes || [];

      const balancesRes = await paymentSlice.getTechniciansBalances();
      const techBalanceData = balancesRes?.data?.techniciansBalances || [];
      const techBalance = techBalanceData.reduce(
        (acc: any, item: any) => acc + item.balance,
        0
      );
      setTechBalance(techBalance);

      setData(systemIncomes);

      const ins = systemIncomes
        .filter((item: any) => item.type === 'in')
        .reduce((acc: any, item: any) => acc + item.netIncome, 0);

      const outs = systemIncomes
        .filter((item: any) => item.type === 'out')
        .reduce((acc: any, item: any) => acc + item.netIncome, 0);

      setTotalIns(ins);
      setTotalOuts(outs);
      setPercentageChanges(calculatePercentageChanges(systemIncomes));

      const totalPaysRes = await paymentSlice.findAllTechniciansPayments();
      const totalPays = totalPaysRes?.data?.techniciansPayments
        .filter((item: any) => item.status === 'paid')
        .reduce(
          (acc: any, item: any) =>
            acc +
            (item.requestedAmount -
              item.requestedAmount * (PAYPACK_TRANSACTION_FEE / 100)),
          0
        );
      setTotalPays(ins);

      setRemainingIncome(totalPays - totalOuts - techBalance);

      console.log(totalIns, totalOuts, techBalance);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 10;
  const firstDatas = data.slice(0, 40);
  const totalPages = Math.ceil(firstDatas.length / PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return firstDatas.slice(0, 40).slice(start, start + PER_PAGE);
  }, [firstDatas, currentPage]);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg mx-4 mt-4">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Financial Overview
        </h1>
        <button
          onClick={fetchData}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Refresh data"
        >
          <FiRefreshCw className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          {
            title: 'Total Tech Balance',
            value: techBalance + techBalance * (PAYPACK_TRANSACTION_FEE / 100),
            type: 'net',
          },
          {
            title: 'Company Balance',
            value:
              totalIns -
              totalOuts -
              techBalance * (PAYPACK_TRANSACTION_FEE / 100),
            type: 'net',
          },
        ].map((stat: any) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-primary mt-2">
              {Math.max(stat.value, 0).toLocaleString()} {CURRENCY}
            </p>
            {stat.title === 'Company Balance' && (
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark disabled:bg-gray-300 transition-colors"
                disabled={stat.value <= 0}
              >
                Withdraw
              </button>
            )}
            {stat.title === 'System Balance' && (
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark disabled:bg-gray-300 transition-colors"
                disabled={stat.value <= 0}
              >
                Withdraw
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Monthly Revenue
          </h2>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 border rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {completeChartData.some(
          (item) => item.income > 0 || item.outcome > 0
        ) ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={completeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `${value} ${CURRENCY}`} />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                  formatter={(value) =>
                    `${Number(value).toLocaleString()} ${CURRENCY}`
                  }
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="outcome"
                  name="Outcome"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No financial data available for {selectedYear}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-700">
            Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Type', 'Amount', 'Description', 'Date'].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                [...paginatedData]
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((item: any) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            item.type === 'in'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.type === 'in' ? 'Income' : 'Withdrawal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {item.netIncome.toFixed(2)} {CURRENCY}
                      </td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {format(new Date(item.createdAt), 'dd MMM yyyy HH:mm')}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
          {!loading && data.length > 0 && (
            <div className="mt-6">
              <Pagination2
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
      {showWithdrawModal && (
        <AdminWithdrawMoney
          data={{
            max:
              totalIns -
              totalOuts -
              techBalance * (PAYPACK_TRANSACTION_FEE / 100),
          }}
          onClose={() => setShowWithdrawModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
