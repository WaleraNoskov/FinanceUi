import {Goal} from '../../core/entities/goal';
import {IGoalRepository} from '../../core/repositories/goal.repository';
import {DBSchema} from 'idb';
import {IndexedDbService} from '../indexed-db.service';
import {Injectable} from '@angular/core';

@Injectable()
export class LocalGoalRepository implements IGoalRepository {

  constructor(private readonly dbService: IndexedDbService) {
  }

  async getAll(offset: number, limit: number): Promise<Goal[]> {
    const db = await this.dbService.db;
    const store = db.transaction('goals', 'readonly').objectStore('goals');

    const result: Goal[] = [];
    let cursor = await store.openCursor();
    let skipped = 0;
    let taken = 0;

    while (cursor && taken < limit) {
      if (skipped < offset) skipped++;
      else {
        result.push(cursor.value);
        taken++;
      }
      cursor = await cursor.continue();
    }

    return result;
  }

  async getById(id: string): Promise<Goal | undefined> {
    const db = await this.dbService.db;
    return db.get('goals', id);
  }

  async add(goal: Goal): Promise<void> {
    const db = await this.dbService.db;
    await db.add('goals', goal);
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
