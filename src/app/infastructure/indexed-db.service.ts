import {Injectable} from '@angular/core';
import {openDB, IDBPDatabase, DBSchema} from 'idb';
import {Goal} from '../core/entities/goal';

interface FinanceDb extends DBSchema {
  goals: {
    key: string;
    value: Goal;
  };
}

@Injectable({providedIn: 'root'})
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<FinanceDb>>;

  constructor() {
    this.dbPromise = openDB<FinanceDb>('finance-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('goals')) {
          db.createObjectStore('goals', {keyPath: 'id', autoIncrement: true});
        }
      }
    });
  }

  get db() {
    return this.dbPromise;
  }
}
