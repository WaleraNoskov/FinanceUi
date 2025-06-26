import {Goal} from '../../core/entities/goal';
import {IGoalRepository} from '../../core/repositories/goal.repository';
import {IndexedDbService} from '../indexed-db.service';
import {Injectable} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {PaginationResult} from '../../core/contracts/pagination-result';
import {PaginationParams} from '../../core/contracts/pagination-params';

@Injectable()
export class GoalRepositoryLocal implements IGoalRepository {

  constructor(private readonly dbService: IndexedDbService) {
  }

  async getAll(pagination: PaginationParams, boardId: string): Promise<PaginationResult<Goal>> {
    const db = await this.dbService.db;
    const store = db.transaction('goals', 'readonly').objectStore('goals');
    const result: PaginationResult<Goal> = { items: [], total: 0 };

    let cursor = await store.openCursor();
    let skipped = 0;
    let taken = 0;
    let matched = 0;

    while (cursor) {
      const goal: Goal = cursor.value;
      if (goal.boardId === boardId) {
        matched++;
        if (skipped < pagination.offset) {
          skipped++;
        } else if (taken < pagination.limit) {
          result.items.push(goal);
          taken++;
        }
      }
      cursor = await cursor.continue();
    }

    result.total = matched;
    return result;
  }

  async getById(id: string): Promise<Goal | undefined> {
    const db = await this.dbService.db;
    return await db.get('goals', id);
  }

  async add(goal: Goal): Promise<string> {
    const db = await this.dbService.db;

    goal.id = uuidv4();
    return await db.add('goals', goal);
  }

  async update(goal: Goal): Promise<void> {
    const db = await this.dbService.db;
    await db.put('goals', goal);
  }

  async delete(id: string): Promise<void> {
    const db = await this.dbService.db;
    await db.delete('goals', id);
  }
}
