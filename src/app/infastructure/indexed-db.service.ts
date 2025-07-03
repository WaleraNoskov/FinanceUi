import {Injectable} from '@angular/core';
import {openDB, IDBPDatabase, DBSchema} from 'idb';
import {Goal} from '../core/entities/goal';
import {Board} from '../core/entities/board';
import {Income} from '../core/entities/income';

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
  incomes: {
    key: string;
    value: Income;
    indexes: {
      by_board: string;
    };
  };
}

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private readonly dbPromise: Promise<IDBPDatabase<FinanceDb>>;

  constructor() {
    this.dbPromise = openDB<FinanceDb>('finance-db', 2, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
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
        }

        if (oldVersion < 2) {
          // incomes
          const incomesStore = db.createObjectStore('incomes', {
            keyPath: 'id',
            autoIncrement: true,
          });
          incomesStore.createIndex('by_board', 'boardId');
        }
      },
    });
  }

  get db() {
    return this.dbPromise;
  }
}
