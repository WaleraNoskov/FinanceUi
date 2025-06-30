import {PaginationParams} from '../../core/contracts/pagination-params';
import {PaginationResult} from '../../core/contracts/pagination-result';
import {Board} from '../../core/entities/board';
import {IBoardRepository} from '../../core/repositories/board.repository';
import {IndexedDbService} from '../indexed-db.service';
import {v4 as uuidv4} from 'uuid';
import {Injectable} from '@angular/core';

@Injectable()
export class BoardRepositoryLocal implements IBoardRepository {
  constructor(private readonly dbService: IndexedDbService) {
  }

  async getAll(pagination: PaginationParams): Promise<PaginationResult<Board>> {
    const db = await this.dbService.db;
    const store = db.transaction('boards', 'readonly').objectStore('boards');
    const result: PaginationResult<Board> = {items: [], total: 0};

    let cursor = await store.openCursor();
    let skipped = 0;
    let taken = 0;
    let matched = 0;

    while (cursor) {
      const board: Board = cursor.value;

      if (skipped < pagination.offset) {
        skipped++;
      } else if (taken < pagination.limit) {
        result.items.push(board);
        taken++;
      }
      cursor = await cursor.continue();
    }

    result.total = matched;
    return result;
  }

  async getById(id: string): Promise<Board | undefined> {
    const db = await this.dbService.db;
    return await db.get('boards', id);
  }

  async add(board: Board): Promise<string> {
    const db = await this.dbService.db;

    board.id = uuidv4();
    return await db.add('boards', board);
  }

  async update(board: Board): Promise<void> {
    const db = await this.dbService.db;
    await db.put('boards', board);
  }

  async delete(id: string): Promise<void> {
    const db = await this.dbService.db;
    await db.delete('boards', id);
  }

  async openAccess(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async closeAccess(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
