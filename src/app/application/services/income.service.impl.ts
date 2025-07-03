import {Inject, Injectable} from '@angular/core';
import {IIncomeService} from '../../core/services/income.service';
import {PaginationParams} from '../../core/contracts/pagination-params';
import {PaginationResult} from '../../core/contracts/pagination-result';
import {Income} from '../../core/entities/income';
import {INCOME_REPOSITORY} from '../../core/repositories/repositories.injection-tokens';
import {IIncomeRepository} from '../../core/repositories/IncomeRepository';

@Injectable({providedIn: 'root'})
export class IncomeService implements IIncomeService {

  constructor(@Inject(INCOME_REPOSITORY) private readonly incomeRepository: IIncomeRepository) {
  }

  async getIncomes(boardId: string | null, startDate: Date, endDate: Date): Promise<Income[]> {
    return await this.incomeRepository.getIncomes(boardId, startDate, endDate);
  }

  async getIncomesPaginated(pagination: PaginationParams, boardId: string | null, startDate: Date, endDate: Date): Promise<PaginationResult<Income>> {
    return await this.incomeRepository.getIncomesPaginated(pagination, boardId, startDate, endDate);
  }

  async getById(id: string | null): Promise<Income | undefined> {
    return await this.incomeRepository.getById(id);
  }

  async create(income: Income): Promise<string> {
    return await this.incomeRepository.create(income);
  }

  async update(income: Income): Promise<void> {
    return await this.incomeRepository.update(income);
  }

  async delete(id: string | null): Promise<void> {
    return await this.incomeRepository.delete(id);
  }
}
