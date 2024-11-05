import React from 'react';
import { format, isSameMonth } from 'date-fns';
import { useFinanceStore } from '../store/useFinanceStore';
import { Receipt, Check, AlertCircle } from 'lucide-react';
import EditTransactionModal from './EditTransactionModal';
import { Bill } from '../types';

interface MonthlyBillsListProps {
  currentDate: Date;
}

export default function MonthlyBillsList({ currentDate }: MonthlyBillsListProps) {
  const bills = useFinanceStore((state) => 
    state.bills.filter(bill => isSameMonth(bill.date, currentDate))
  );
  const toggleBillPaid = useFinanceStore((state) => state.toggleBillPaid);
  const [editBill, setEditBill] = React.useState<Bill | null>(null);

  const sortedBills = [...bills].sort((a, b) => {
    // Sort by date first
    const dateComparison = a.date.getTime() - b.date.getTime();
    if (dateComparison !== 0) return dateComparison;
    
    // If same date, sort paid bills after unpaid bills
    if (a.isPaid !== b.isPaid) return a.isPaid ? 1 : -1;
    
    // If paid status is the same, sort by amount
    return b.amount - a.amount;
  });

  const totalUnpaid = sortedBills
    .filter(bill => !bill.isPaid)
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Bills for {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center text-red-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">
              ${totalUnpaid.toFixed(2)} unpaid
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {sortedBills.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No bills for this month
            </p>
          ) : (
            sortedBills.map((bill) => (
              <div
                key={bill.id}
                onClick={() => setEditBill(bill)}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  toggleBillPaid(bill.id);
                }}
                className={`
                  flex items-center justify-between p-3 rounded-lg cursor-pointer
                  transition-colors duration-200
                  ${bill.isPaid
                    ? 'bg-gray-50 hover:bg-gray-100'
                    : 'bg-red-50 hover:bg-red-100'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-2 rounded-full
                    ${bill.isPaid ? 'bg-gray-200' : 'bg-red-200'}
                  `}>
                    <Receipt className={`h-4 w-4 ${bill.isPaid ? 'text-gray-600' : 'text-red-600'}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${bill.isPaid ? 'text-gray-600' : 'text-gray-900'}`}>
                      {bill.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(bill.date, 'MMM d')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`font-medium ${bill.isPaid ? 'text-gray-600' : 'text-red-600'}`}>
                    ${bill.amount.toFixed(2)}
                  </span>
                  {bill.isPaid && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {editBill && (
        <EditTransactionModal
          transaction={editBill}
          type="bill"
          onClose={() => setEditBill(null)}
        />
      )}
    </>
  );
}