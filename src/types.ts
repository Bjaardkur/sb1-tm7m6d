export interface Bill {
  id: string;
  date: Date;
  amount: number;
  description: string;
  isPaid: boolean;
}

export interface Income {
  id: string;
  date: Date;
  amount: number;
  description: string;
}

export interface CalendarDay {
  date: Date;
  bills: Bill[];
  income: Income[];
}