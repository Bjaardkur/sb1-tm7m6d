import React from 'react';
import { format } from 'date-fns';
import { X, Trash2, CheckCircle2 } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import { Bill, Income } from '../types';

interface EditTransactionModalProps {
  transaction: Bill | Income;
  type: 'bill' | 'income';
  onClose: () => void;
}

export default function EditTransactionModal({ 
  transaction, 
  type, 
  onClose 
}: EditTransactionModalProps) {
  const updateBill = useFinanceStore((state) => state.updateBill);
  const updateIncome = useFinanceStore((state) => state.updateIncome);
  const deleteBill = useFinanceStore((state) => state.deleteBill);
  const deleteIncome = useFinanceStore((state) => state.deleteIncome);
  const toggleBillPaid = useFinanceStore((state) => state.toggleBillPaid);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const amount = Number(formData.get('amount'));
    const description = formData.get('description') as string;

    if (type === 'bill') {
      updateBill(transaction.id, { amount, description });
    } else {
      updateIncome(transaction.id, { amount, description });
    }

    onClose();
  };

  const handleDelete = () => {
    if (type === 'bill') {
      deleteBill(transaction.id);
    } else {
      deleteIncome(transaction.id);
    }
    onClose();
  };

  const handleTogglePaid = () => {
    if (type === 'bill') {
      toggleBillPaid(transaction.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit {type === 'bill' ? 'Bill' : 'Income'} for {format(transaction.date, 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              defaultValue={transaction.amount}
              min="0"
              step="0.01"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              defaultValue={transaction.description}
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
            {type === 'bill' && (
              <button
                type="button"
                onClick={handleTogglePaid}
                className={`flex items-center justify-center px-4 rounded-md transition-colors ${
                  (transaction as Bill).isPaid
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <CheckCircle2 className="h-5 w-5" />
              </button>
            )}
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </form>

        {type === 'bill' && (
          <div className="mt-4 text-sm text-gray-500">
            Status: {(transaction as Bill).isPaid ? 'Paid' : 'Unpaid'}
          </div>
        )}
      </div>
    </div>
  );
}