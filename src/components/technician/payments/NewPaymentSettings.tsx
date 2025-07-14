import React, { useState } from 'react';
import {
  FaCheckCircle,
  FaSpinner,
  FaTimes,
  FaExclamationCircle,
} from 'react-icons/fa';
import paymentSlice from '../../../state/features/paymentSlice';

interface NewPaymentSettingsProps {
  onClose: () => void;
  onSuccess?: () => any;
}

const NewPaymentSettings: React.FC<NewPaymentSettingsProps> = ({
  onClose,
  onSuccess,
}) => {
  const [serviceFee, setServiceFee] = useState('3');
  const [transactionFeeRate, setTransactionFeeRate] = useState('2.3');

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (!serviceFee || !transactionFeeRate) {
        throw new Error('Please fill all required fields');
      }

      if (serviceFee < transactionFeeRate) {
        throw new Error('Service fee cannot be less than transaction fee rate');
      }

      const paymentData = {
        serviceFee: parseFloat(serviceFee),
        transactionFeeRate: parseFloat(transactionFeeRate),
      };

      const response = await paymentSlice.savePaymentSettings(paymentData);
      if (response.status === 200) {
        setSuccessMessage('Payment settings saved successfully!');
        onSuccess?.();

        setTimeout(() => {
          onClose();
          resetForm();
        }, 2000);
      } else {
        throw new Error(response.data?.message || 'Payment request failed');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setServiceFee('');
    setTransactionFeeRate('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Update Payment Settings
            </h2>
            <button
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </div>

          {error && (
            <div className="flex items-center text-red-600 text-sm mb-4">
              <FaExclamationCircle className="mr-2" /> {error}
            </div>
          )}
          {successMessage && (
            <div className="flex items-center text-green-600 text-sm mb-4">
              <FaCheckCircle className="mr-2" /> {successMessage}
            </div>
          )}

          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="serviceFee"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Service Fee (%)
              </label>
              <input
                type="number"
                id="serviceFee"
                step="0.01"
                min="0"
                value={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="e.g. 3.0"
                required
              />
            </div>

            <div>
              <label
                htmlFor="transactionFeeRate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Transaction Fee Rate (%)
              </label>
              <input
                type="number"
                id="transactionFeeRate"
                step="0.01"
                min="0"
                value={transactionFeeRate}
                onChange={(e) => setTransactionFeeRate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="e.g. 2.3"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Saving...
                  </>
                ) : (
                  'Save Settings'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPaymentSettings;
