import {Income} from '../entities/income';
import {PaginationParams} from '../contracts/pagination-params';
import {PaginationResult} from '../contracts/pagination-result';

export interface IIncomeService {
  getIncomesPaginated(pagination: PaginationParams, boardId: string | null, startDate: Date, endDate: Date): Promise<PaginationResult<Income>>;

  getIncomes( boardId: string | null, startDate: Date, endDate: Date): Promise<Income[]>;

  getById(id: string | null): Promise<Income | undefined>;

  create(income: Income): Promise<string>;

  update(income: Income): Promise<void>;

  delete(id: string | null): Promise<void>;
}
