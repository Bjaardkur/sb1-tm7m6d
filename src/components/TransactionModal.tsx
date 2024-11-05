import React from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';

interface TransactionModalProps {
  date: Date;
  onClose: () => void;
}

export default function TransactionModal({ date, onClose }: TransactionModalProps) {
  const [isIncome, setIsIncome] = React.useState(true);
  const addBill = useFinanceStore((state) => state.addBill);
  const addIncome = useFinanceStore((state) => state.addIncome);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const amount = Number(formData.get('amount'));
    const description = formData.get('description') as string;

    if (isIncome) {
      addIncome({ date, amount, description });
    } else {
      addBill({ date, amount, description });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Add Transaction for {format(date, 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setIsIncome(true)}
              className={`flex-1 py-2 rounded-md transition-colors ${
                isIncome
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setIsIncome(false)}
              className={`flex-1 py-2 rounded-md transition-colors ${
                !isIncome
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Bill
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              min="0"
              step="0.01"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder={`Enter ${isIncome ? 'income' : 'bill'} description`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add {isIncome ? 'Income' : 'Bill'}
          </button>
        </form>
      </div>
    </div>
  );
}