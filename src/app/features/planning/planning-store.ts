import {computed, Inject, Injectable, signal} from '@angular/core';
import {INCOME_SERVICE} from '../../core/services/services.injection-tokens';
import {IIncomeService} from '../../core/services/income.service';
import {PeriodColumn} from '../../core/contracts/period-column';
import {Income} from '../../core/entities/income';
import {getPeriodEndDate, getPeriodStartDate, Recurrence} from '../../core/contracts/recurrence';

@Injectable({providedIn: 'root'})
export class PlanningStore {
  private columns = signal<PeriodColumn[]>([]);
  public readonly getColumns = computed(() => this.columns());

  private period = signal<Recurrence>(Recurrence.Monthly);
  public readonly getPeriod = computed(() => this.period())

  private periodStart = signal<Date>(new Date());
  public readonly getPeriodStart = computed(() => this.periodStart());

  constructor(@Inject(INCOME_SERVICE) private incomeService: IIncomeService) {
  }

  async loadColumns(period: Recurrence, periodStart: Date, boardId: string): Promise<void> {
    const startDate = getPeriodStartDate(periodStart, period);
    const endDate = getPeriodEndDate(periodStart, period);

    this.period.set(period);
    this.periodStart.set(startDate);

    const incomes = await this.incomeService.getIncomes(boardId, startDate, endDate);
    const incomeDays = this.getSortedIncomeDays(incomes);

    let columns: PeriodColumn[] = [];
    for (const date of incomeDays) {
      const column = new PeriodColumnBuilder(date)
        .withIncomes(incomes)
        .build();

      columns.push(column);
    }

    this.columns.set(columns);
  }

  async createIncome(income: Income): Promise<string> {
    return await this.incomeService.create(income);
  }

  async updateIncome(income: Income): Promise<void> {
    await this.incomeService.update(income);
  }

  async deleteIncome(income: Income): Promise<void> {
    await this.incomeService.delete(income.id)
  }

  private getSortedIncomeDays(incomes: Income[]): Date[] {
    return this.getIncomeDays(incomes).sort((a, b) => a.getTime() - b.getTime());
  }

  private getIncomeDays(incomes: Income[]): Date[] {
    const days = new Set<string>();

    for (const income of incomes) {
      const dayStr = new Date(income.date).toDateString();
      days.add(dayStr);
    }

    return Array.from(days).map(d => new Date(d));
  }
}

class PeriodColumnBuilder {
  private date: Date;
  private endDate?: Date;
  private incomes: Income[] = [];

  constructor(date: Date) {
    this.date = date;
  }

  withEndDate(endDate: Date): this {
    this.endDate = endDate;
    return this;
  }

  withIncomes(incomes: Income[]): this {
    this.incomes = incomes.filter(income => this.isInPeriod(income.date));
    return this;
  }

  build(): PeriodColumn {
    const totalIncome = this.incomes.reduce((sum, income) => sum + income.amount, 0);

    return {
      date: this.date,
      endDate: this.endDate,
      incomes: this.incomes,
      totalIncome,
    };
  }

  private isInPeriod(date: Date): boolean {
    const target = new Date(date);
    const start = getPeriodStartDate(date, Recurrence.Once)
    const end = getPeriodEndDate(this.endDate ? this.endDate : start, Recurrence.Once);
    return target >= start && target <= end;
  }
}
