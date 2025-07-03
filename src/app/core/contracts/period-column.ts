import {Income} from '../entities/income';

export interface PeriodColumn {
  date: Date;
  endDate?: Date;

  incomes: Income[];
  totalIncome: number;
}
