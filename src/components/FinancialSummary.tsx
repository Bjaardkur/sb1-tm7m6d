import React from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export default function FinancialSummary() {
  const { bills, income, getBalance } = useFinanceStore();
  
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
  const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const currentBalance = getBalance();

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2 text-green-600 mb-2">
          <TrendingUp className="h-5 w-5" />
          <h3 className="font-medium">Total Income</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">${totalIncome}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2 text-red-600 mb-2">
          <TrendingDown className="h-5 w-5" />
          <h3 className="font-medium">Total Bills</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900">${totalBills}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-2 text-indigo-600 mb-2">
          <Wallet className="h-5 w-5" />
          <h3 className="font-medium">Available Balance</h3>
        </div>
        <p className={`text-2xl font-bold ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${currentBalance}
        </p>
      </div>
    </div>
  );
}