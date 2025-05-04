import React, { useState } from 'react';
import { FaCheckCircle, FaSpinner, FaTimes } from 'react-icons/fa';
import paymentSlice from '../../../state/features/paymentSlice';

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

interface RequestPaymentProps {
  onClose: () => void;
  userId?: string;
  onSuccess?: () => any;
}

const RequestPayment: React.FC<RequestPaymentProps> = ({
  onClose,
  onSuccess,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('processing');

    try {
      if (!phoneNumber || !amount || !note) {
        throw new Error('Please fill all required fields');
      }

      if (note.length < 4 || note.length > 22) {
        throw new Error('Note must be between 4-22 characters');
      }

      const paymentData = {
        amount: parseFloat(amount),
        payer: phoneNumber,
        note,
      };
      const response = await paymentSlice.technicianRequestPaypackPayment(
        paymentData
      );

      if (response.status === 201) {
        setStatus('success');
        onSuccess?.();
        setTransactionId(response.data.newRequest.depositId);
        setTimeout(() => {
          onClose();
          resetForm();
        }, 3000);
      } else {
        throw new Error(response.data?.message || 'Payment request failed');
      }
    } catch (error: any) {
      setStatus('error');
      console.error('Payment error:', error);
      const errorMessage = error.response?.data?.message || error.message;

      if (errorMessage.includes('timeout')) {
        setError('Payment confirmation timeout. Please try again.');
      } else if (error.response?.status === 400) {
        setError('Invalid request: ' + errorMessage);
      } else {
        setError('Payment failed. Please try again later.');
      }
    }
  };

  const resetForm = () => {
    setPhoneNumber('');
    setAmount('');
    setNote('');
    setError('');
  };

  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 mb-4">
              <FaSpinner className="h-8 w-8 text-green-600 animate-spin" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Processing Payment...
            </h3>
            <p className="text-gray-500">
              Please wait while we process your payment request
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <FaCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-500">
              The amount has been added to your account balance.
            </p>
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
              {error}
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
            {' '}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Phone Number (MTN/Airtel)
              </label>
              <div className="flex">
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, ''))
                  }
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0783456129"
                  required
                  maxLength={10}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Amount (RWF)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="1000"
                min="10"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="note"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Payment Note (4-22 characters)
              </label>
              <input
                type="text"
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Service payment"
                minLength={4}
                maxLength={22}
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2"
              >
                Request Payment
              </button>
            </div>
          </form>
        );
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-green-700">
              {status === 'processing'
                ? 'Payment in Progress'
                : 'Request Payment'}
            </h2>
            {status === 'idle' && (
              <button
                onClick={() => {
                  onClose();
                  resetForm();
                }}
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

export default RequestPayment;
