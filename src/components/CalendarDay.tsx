import React from 'react';
import { format } from 'date-fns';
import { Bill, Income } from '../types';
import { useFinanceStore } from '../store/useFinanceStore';
import { DollarSign, Receipt } from 'lucide-react';
import EditTransactionModal from './EditTransactionModal';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  bills: Bill[];
  income: Income[];
  onDateClick: (date: Date) => void;
}

export default function CalendarDay({
  date,
  isCurrentMonth,
  isToday,
  bills,
  income,
  onDateClick,
}: CalendarDayProps) {
  const toggleBillPaid = useFinanceStore((state) => state.toggleBillPaid);
  const [editTransaction, setEditTransaction] = React.useState<{
    transaction: Bill | Income;
    type: 'bill' | 'income';
  } | null>(null);

  return (
    <>
      <div
        onClick={() => isCurrentMonth && onDateClick(date)}
        className={`
          min-h-[100px] p-2 border border-gray-200 transition-colors
          ${isCurrentMonth ? 'bg-white hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'}
          ${isToday ? 'ring-2 ring-indigo-600' : ''}
        `}
      >
        <div className="text-right">
          <span
            className={`
              text-sm font-medium
              ${!isCurrentMonth && 'text-gray-400'}
              ${isToday && 'text-indigo-600'}
            `}
          >
            {format(date, 'd')}
          </span>
        </div>

        <div className="mt-2 space-y-1">
          {income.map((inc) => (
            <div
              key={inc.id}
              className="flex items-center text-sm text-green-600 bg-green-50 rounded p-1 cursor-pointer hover:bg-green-100"
              onClick={(e) => {
                e.stopPropagation();
                setEditTransaction({ transaction: inc, type: 'income' });
              }}
            >
              <DollarSign className="h-3 w-3 mr-1" />
              <span className="truncate">+${inc.amount}</span>
            </div>
          ))}

          {bills.map((bill) => (
            <div
              key={bill.id}
              className={`
                flex items-center justify-between text-sm rounded p-1 cursor-pointer
                ${bill.isPaid
                  ? 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                  : 'text-red-600 bg-red-50 hover:bg-red-100'
                }
              `}
              onClick={(e) => {
                e.stopPropagation();
                setEditTransaction({ transaction: bill, type: 'bill' });
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                toggleBillPaid(bill.id);
              }}
            >
              <div className="flex items-center">
                <Receipt className="h-3 w-3 mr-1" />
                <span className="truncate">-${bill.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editTransaction && (
        <EditTransactionModal
          transaction={editTransaction.transaction}
          type={editTransaction.type}
          onClose={() => setEditTransaction(null)}
        />
      )}
    </>
  );
}