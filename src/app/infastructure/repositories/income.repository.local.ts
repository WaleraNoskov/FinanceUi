import {IIncomeRepository} from '../../core/repositories/IncomeRepository';
import {IndexedDbService} from '../indexed-db.service';
import {PaginationParams} from '../../core/contracts/pagination-params';
import {Injectable} from '@angular/core';
import {PaginationResult} from '../../core/contracts/pagination-result';
import {Income} from '../../core/entities/income';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class IncomeRepositoryLocal implements IIncomeRepository {

  constructor(private readonly dbService: IndexedDbService) {
  }

  async getIncomes(pagination: PaginationParams, boardId: string | null, startDate: Date, endDate: Date): Promise<PaginationResult<Income>> {
    const db = await this.dbService.db;
    const store = db.transaction('incomes', 'readonly').objectStore('incomes');
    const index = store.index('by_board');
    const incomes: PaginationResult<Income> = {items: [], total: 0};

    let matched = 0;
    let skipped = 0;
    let taken = 0;

    const range = boardId ? IDBKeyRange.only(boardId) : null;

    let current = range ? await index.openCursor(range) : await store.openCursor();
    while (current) {
      const income: Income = current.value;
      const date = new Date(income.date);
      if (date >= startDate && date <= endDate) {
        matched++;
        if (skipped < pagination.offset) {
          skipped++;
        } else if (taken < pagination.limit) {
          incomes.items.push(income);
          taken++;
        }
      }
      current = await current.continue();
    }

    incomes.total = matched;
    return incomes;
  }

  async getById(id: string | null): Promise<Income | undefined> {
    if (!id) return undefined;
    const db = await this.dbService.db;
    return await db.get('incomes', id);
  }

  async create(income: Income): Promise<string> {
    const db = await this.dbService.db;
    income.id = uuidv4();
    await db.add('incomes', income);
    return income.id.toString();
  }

  async update(income: Income): Promise<void> {
    const db = await this.dbService.db;
    await db.put('incomes', income);
  }

  async delete(id: string | null): Promise<void> {
    if (!id) return;
    const db = await this.dbService.db;
    await db.delete('incomes', id);
  }
}
