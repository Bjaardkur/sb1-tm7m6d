import { create } from 'zustand';
import { Bill, Income } from '../types';

interface FinanceStore {
  bills: Bill[];
  income: Income[];
  addBill: (bill: Omit<Bill, 'id' | 'isPaid'>) => void;
  addIncome: (income: Omit<Income, 'id'>) => void;
  updateBill: (id: string, bill: Partial<Omit<Bill, 'id'>>) => void;
  updateIncome: (id: string, income: Partial<Omit<Income, 'id'>>) => void;
  deleteBill: (id: string) => void;
  deleteIncome: (id: string) => void;
  toggleBillPaid: (id: string) => void;
  getBalance: () => number;
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  bills: [],
  income: [],
  
  addBill: (bill) => set((state) => ({
    bills: [...state.bills, { ...bill, id: crypto.randomUUID(), isPaid: false }]
  })),
  
  addIncome: (income) => set((state) => ({
    income: [...state.income, { ...income, id: crypto.randomUUID() }]
  })),

  updateBill: (id, updates) => set((state) => ({
    bills: state.bills.map(bill =>
      bill.id === id ? { ...bill, ...updates } : bill
    )
  })),

  updateIncome: (id, updates) => set((state) => ({
    income: state.income.map(inc =>
      inc.id === id ? { ...inc, ...updates } : inc
    )
  })),

  deleteBill: (id) => set((state) => ({
    bills: state.bills.filter(bill => bill.id !== id)
  })),

  deleteIncome: (id) => set((state) => ({
    income: state.income.filter(inc => inc.id !== id)
  })),
  
  toggleBillPaid: (id) => set((state) => ({
    bills: state.bills.map(bill =>
      bill.id === id ? { ...bill, isPaid: !bill.isPaid } : bill
    )
  })),
  
  getBalance: () => {
    const { bills, income } = get();
    const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
    const totalPaidBills = bills
      .filter(bill => bill.isPaid)
      .reduce((sum, bill) => sum + bill.amount, 0);
    return totalIncome - totalPaidBills;
  },
}));