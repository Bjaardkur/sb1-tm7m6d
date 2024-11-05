import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { useFinanceStore } from '../store/useFinanceStore';
import CalendarDay from './CalendarDay';
import MonthlyBillsList from './MonthlyBillsList';
import TransactionModal from './TransactionModal';

export default function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const { bills, income } = useFinanceStore();
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-6 w-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                >
                  Today
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
              
              {days.map((day) => (
                <CalendarDay
                  key={day.toISOString()}
                  date={day}
                  isCurrentMonth={isSameMonth(day, currentDate)}
                  isToday={isToday(day)}
                  bills={bills.filter(bill => 
                    format(bill.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                  )}
                  income={income.filter(inc => 
                    format(inc.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                  )}
                  onDateClick={setSelectedDate}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <MonthlyBillsList currentDate={currentDate} />
        </div>
      </div>

      {selectedDate && (
        <TransactionModal
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </>
  );
}