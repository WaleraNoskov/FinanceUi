import {Injectable} from '@angular/core';
import {openDB, IDBPDatabase, DBSchema} from 'idb';
import {Goal} from '../core/entities/goal';
import {Board} from '../core/entities/board';

export interface FinanceDb extends DBSchema {
  goals: {
    key: string;
    value: Goal;
    indexes: {
      by_board: string;
    };
  };
  boards: {
    key: string;
    value: Board;
  };
}

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private readonly dbPromise: Promise<IDBPDatabase<FinanceDb>>;

  constructor() {
    this.dbPromise = openDB<FinanceDb>('finance-db', 1, {
      upgrade(db) {
        // boards
        const boardsStore = db.createObjectStore('boards', {
          keyPath: 'id',
          autoIncrement: true,
        });

        // goals
        const goalsStore = db.createObjectStore('goals', {
          keyPath: 'id',
          autoIncrement: true,
        });
        goalsStore.createIndex('by_board', 'boardId');
      },
    });
  }

  get db() {
    return this.dbPromise;
  }
}
