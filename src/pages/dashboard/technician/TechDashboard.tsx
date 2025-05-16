import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import paymentSlice from '../../../state/features/paymentSlice';
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
export const PAYPACK_TRANSACTION_FEE = 2.3;
const CURRENCY = 'RWF';
const DEFAULT_YEAR = new Date().getFullYear();

const processChartData = (data: any[]) => {
  const monthlyData: { [key: string]: { income: number; outcome: number } } =
    {};

  data.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${month}`;

    if (!monthlyData[key]) {
      monthlyData[key] = { income: 0, outcome: 0 };
    }

    // Use correct fields based on transaction type
    if (transaction.type === 'in') {
      monthlyData[key].income += transaction.receivedAmount;
    } else {
      monthlyData[key].outcome += transaction.amount;
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

const TechnicianDashboard = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [techBalance, setTechBalance] = useState<any>(0);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await paymentSlice.findTechOwnPayments();
      const systemIncomes = res?.data?.technicianPayments || [];
      const res2 = await paymentSlice.techFindWithdrawals();
      const withdrawals = res2?.data?.withdrawals || [];

      const processedPayments = systemIncomes.map((payment: any) => ({
        ...payment,
        type: 'in',
        netIncome: payment.receivedAmount,
      }));

      const processedWithdrawals = withdrawals.map((withdrawal: any) => ({
        ...withdrawal,
        type: 'out',
        netIncome: withdrawal.amount,
      }));

      setData([...processedPayments, ...processedWithdrawals]);

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const currentMonthIncome = systemIncomes
        .filter((payment: any) => {
          const date = new Date(payment.createdAt);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear &&
            payment.status === 'paid'
          );
        })
        .reduce((sum: any, payment: any) => sum + payment.receivedAmount, 0);

      const currentMonthOutcome = withdrawals
        .filter((withdrawal: any) => {
          const date = new Date(withdrawal.createdAt);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear &&
            withdrawal.status === 'paid'
          );
        })
        .reduce((sum: any, withdrawal: any) => sum + withdrawal.amount, 0);

      setTechBalance(currentMonthIncome - currentMonthOutcome);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };
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
            title: 'Current month Income',
            value: techBalance,
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-primary mt-2">
              {Math.max(stat.value, 0).toLocaleString()} {CURRENCY}
            </p>
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
    </div>
  );
};

export default TechnicianDashboard;
