import { Wallet, ArrowUpCircle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import WithdrawMoney from '../../../components/technician/payments/WithdrawMoney';
import paymentSlice from '../../../state/features/paymentSlice';
import Pagination2 from '../../../components/Pagination2';
import { Link } from 'react-router-dom';
import { FaExchangeAlt } from 'react-icons/fa';

interface Transaction {
  id: number;
  type: 'Payment' | 'Withdraw';
  description: string;
  requestedAmount?: number;
  receivedAmount?: number;
  serviceFee?: any;
  amount?: number;
  date: string;
}

interface Profile {
  balance?: number;
  phone?: string;
}

const TechnicianBalance = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const PER_PAGE = 10;
  const totalPages = Math.ceil(transactions.length / PER_PAGE);

  const formatCurrency = useMemo(
    () => (amount: number) => {
      return `${amount >= 0 ? '+' : '-'}${Math.abs(amount).toFixed(2)} RWF`;
    },
    []
  );

  useEffect(() => {
    const loadProfile = () => {
      try {
        const storedProfile = localStorage.getItem('profile');
        if (storedProfile) {
          const parsedProfile: Profile = JSON.parse(storedProfile);
          if (!parsedProfile.phone) {
            console.warn('Phone number missing in profile');
          }
          setProfile(parsedProfile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const payments = await paymentSlice.findTechOwnPayments();
        const withdrawals = await paymentSlice.techFindWithdrawals();

        const mapTransaction = (
          item: any,
          type: 'Payment' | 'Withdraw',
          description: string,
          amountMultiplier: number
        ): Transaction => ({
          id: item._id,
          type,
          description,
          amount: item.amount * amountMultiplier,
          date: new Date(item.paidAt || item.createdAt).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }
          ),
        });

        const mappedPayments = payments.data.technicianPayments.map(
          (payment: any) => ({
            id: payment._id,
            type: 'Payment',
            description: `Payment from ${payment.payer}`,
            requestedAmount: payment.requestedAmount,
            receivedAmount: payment.receivedAmount,
            serviceFee: payment.serviceFee,
            date: new Date(
              payment.paidAt || payment.createdAt
            ).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
          })
        );

        const mappedWithdrawals = withdrawals.data.withdrawals.map(
          (withdrawal: any) =>
            mapTransaction(
              withdrawal,
              'Withdraw',
              `Withdraw to ${withdrawal.phone}`,
              -1
            )
        );

        const allTransactions = [...mappedPayments, ...mappedWithdrawals].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setTransactions(allTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [profile]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return transactions.slice(start, start + PER_PAGE);
  }, [transactions, currentPage, PER_PAGE]);

  if (!profile) {
    return (
      <div className="p-4 max-w-7xl mx-auto animate-pulse">
        <div className="bg-gray-200 p-6 md:p-10 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="space-y-4 flex-1">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="w-10 h-10 mt-4 md:mt-0 md:ml-4 bg-gray-300 rounded-full"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 bg-gray-300 rounded-xl">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                  <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="bg-primary text-white p-6 md:p-10 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <p className="text-sm md:text-base opacity-80">Total Balance</p>
              <h2 className="text-3xl md:text-4xl font-semibold mt-1">
                {profile?.balance?.toFixed(2) ?? '0.00'} RWF
              </h2>
            </div>
            <Wallet className="w-10 h-10 mt-4 md:mt-0 md:ml-4 opacity-30" />
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 transition text-sm md:text-base"
              onClick={() => {
                setShowWithdrawModal(true);
              }}
            >
              <ArrowUpCircle className="w-6 h-6 mb-1 text-white" />
              Withdraw
            </button>
            <Link
              to="/dashboard/my-payments"
              className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-10 rounded-xl hover:bg-opacity-20 transition text-sm md:text-base"
            >
              <FaExchangeAlt className="w-6 h-6 mb-1 text-white" />
              My payments
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {paginatedData.map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                formatCurrency={formatCurrency}
              />
            ))}
            {paginatedData.length > 0 ? (
              <div className="mt-6">
                <Pagination2
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            ) : (
              <div className="text-center text-gray-500">
                No transactions found.
              </div>
            )}
          </div>
        </div>
        {showWithdrawModal && (
          <WithdrawMoney
            onClose={() => setShowWithdrawModal(false)}
            data={{ phone: profile.phone }}
          />
        )}
      </div>
    </>
  );
};

const TransactionItem = ({
  transaction,
  formatCurrency,
}: {
  transaction: Transaction;
  formatCurrency: (amount: number) => string;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
      <div>
        <p className="font-medium">{transaction.description}</p>
        <p className="text-sm text-gray-500">{transaction.date}</p>
      </div>
      <div className="text-right">
        {transaction.type === 'Payment' ? (
          <div className="text-sm text-green-600 space-y-1">
            <div>Requested: {transaction.requestedAmount?.toFixed(2)} RWF</div>
            <div>Received: {transaction.receivedAmount?.toFixed(2)} RWF</div>
            <div className="text-xs text-gray-500">
              Fee: {transaction.serviceFee * 100} RWF
            </div>
          </div>
        ) : (
          <div className="text-red-600 text-sm">
            {formatCurrency(transaction.amount || 0)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicianBalance;
