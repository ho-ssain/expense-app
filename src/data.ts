export enum ReportType {
  Income = 'income',
  Expense = 'expense',
}

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: 'income' | 'expense';
  }[];
}

export const data: Data = {
  report: [
    {
      id: '1',
      source: 'Job_Salary',
      amount: 1000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Income,
    },
    {
      id: '2',
      source: 'Buss-1',
      amount: 5000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Income,
    },
    {
      id: '3',
      source: 'Buss-2',
      amount: 2000,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Income,
    },
    {
      id: '4',
      source: 'food',
      amount: 100,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Expense,
    },
    {
      id: '5',
      source: 'rent',
      amount: 200,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.Expense,
    },
  ],
};
