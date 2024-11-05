import React from 'react';
import { useFinanceStore } from '../store/useFinanceStore';

export default function AddTransactionForm() {
  const [isIncome, setIsIncome] = React.useState(true);
  const addBill = useFinanceStore((state) => state.addBill);
  const addIncome = useFinanceStore((state) => state.addIncome);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const amount = Number(formData.get('amount'));
    const date = new Date(formData.get('date') as string);
    const description = formData.get('description') as string;

    if (isIncome) {
      addIncome({ date, amount, description });
    } else {
      addBill({ date, amount, description });
    }

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          onClick={() => setIsIncome(true)}
          className={`flex-1 py-2 rounded-md ${
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
          className={`flex-1 py-2 rounded-md ${
            !isIncome
              ? 'bg-red-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Bill
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
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
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add {isIncome ? 'Income' : 'Bill'}
        </button>
      </div>
    </form>
  );
}