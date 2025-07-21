import React, { useState } from 'react';
import { FaCheckCircle, FaSpinner, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';
import paymentSlice from '../../state/features/paymentSlice';
import { PAYPACK_TRANSACTION_FEE } from '../../pages/dashboard/admin/Dashboard';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

interface WithdrawMoneyData {
  max: number;
}

interface WithdrawMoneyProps {
  onClose: () => void;
  onSuccess?: () => void;
  data: WithdrawMoneyData;
}

const AdminWithdrawMoney: React.FC<WithdrawMoneyProps> = ({
  onClose,
  onSuccess,
  data,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [password, setPassword] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('processing');

    try {
      if (!phoneNumber || !amount || !password) {
        throw new Error('Please fill all required fields');
      }

      const paymentData = {
        amount: parseFloat(amount),
        phone: phoneNumber,
        password,
      };

      const response = await paymentSlice.adminWithdrawMoney(paymentData);
      if (response.status === 200) {
        setStatus('success');
        onSuccess?.();
        setTransactionId(response.data.techWithdrawal.withdrawId);
        setTimeout(() => {
          onClose();
          resetForm();
        }, 3000);
      } else if (response.status === 500) {
        throw new Error(response.data.message || 'Payment failed');
      } else {
        toast.error(response?.message || 'Payment request failed');
        setStatus('error');
        setError(response?.message || 'Payment request failed');
      }
    } catch (error: any) {
      setStatus('error');
      console.error('Payment error:', error);
      const errorMessage =
        'an error occurred while processing your request, please try again later or contact support';
      setError(errorMessage);
    }
  };

  const resetForm = () => {
    setPhoneNumber('');
    setAmount('');
    setError('');
  };

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="text-center py-8">
            <FaSpinner className="h-8 w-8 text-green-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Processing Payment...</h3>
            <p className="text-gray-500">
              Please wait while we process your request
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-8">
            <FaCheckCircle className="h-6 w-6 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Payment Successful!</h3>
            <div className="mt-4 bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-700">
                Transaction ID: {transactionId}
              </p>
            </div>
          </div>
        );

      case 'error':
        return (
          <>
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error || 'Payment failed. Please try again.'}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setStatus('idle')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Try Again
              </button>
            </div>
          </>
        );

      default:
        return (
          <form onSubmit={handlePaymentSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, ''))
                }
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="0783456129"
                required
                maxLength={10}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Amount (RWF)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="1000"
                min="100"
                max={Number(
                  (data.max / (1 + PAYPACK_TRANSACTION_FEE / 100)).toFixed(2)
                )}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Confirm Withdraw
              </button>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-green-700">
              {status === 'idle' ? 'Withdraw Funds' : 'Transaction Status'}
            </h2>
            {status === 'idle' && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            )}
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminWithdrawMoney;
