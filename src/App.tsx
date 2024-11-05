import React from 'react';
import Calendar from './components/Calendar';
import FinancialSummary from './components/FinancialSummary';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Financial Calendar</h1>
        
        <div className="space-y-6">
          <FinancialSummary />
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;