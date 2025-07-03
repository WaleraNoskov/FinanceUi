import {IncomeRepositoryLocal} from './income.repository.local';
import {TestBed} from '@angular/core/testing';
import {IndexedDbService} from '../indexed-db.service';
import {Income} from '../../core/entities/income';
import {Recurrence} from '../../core/contracts/recurrence';
import {PaginationParams} from '../../core/contracts/pagination-params';
import {v4 as uuidv4} from 'uuid';

describe('IncomeRepositoryLocal', () => {
  let repo: IncomeRepositoryLocal;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [IncomeRepositoryLocal, IndexedDbService]
    });

    repo = TestBed.inject(IncomeRepositoryLocal);

    // Очищаем IndexedDB перед каждым тестом
    const db = await (await TestBed.inject(IndexedDbService).db);
    const tx = db.transaction(['incomes'], 'readwrite');
    await tx.objectStore('incomes').clear();
    await tx.done;
  });

  it('should create and get an income', async () => {
    const income: Income = {
      id: uuidv4(),
      name: 'Test Income',
      amount: 500,
      date: new Date(),
      recurrence: Recurrence.Once,
      boardId: 'board1',
    };

    const id = await repo.create(income);
    const result = await repo.getById(id);

    expect(result).toBeTruthy();
    expect(result?.name).toBe('Test Income');
  });

  it('should update income', async () => {
    const income: Income = {
      id: uuidv4(),
      name: 'To update',
      amount: 100,
      date: new Date(),
      recurrence: Recurrence.Once,
      boardId: 'board1'
    };

    const id = await repo.create(income);
    const original = await repo.getById(id);

    original!.name = 'Updated';
    await repo.update(original!);

    const updated = await repo.getById(id);
    expect(updated?.name).toBe('Updated');
  });

  it('should delete income', async () => {
    const income: Income = {
      id: uuidv4(),
      name: 'To delete',
      amount: 300,
      date: new Date(),
      recurrence: Recurrence.Once,
      boardId: 'board1'
    };

    const id = await repo.create(income);
    await repo.delete(id);
    const result = await repo.getById(id);

    expect(result).toBeUndefined();
  });

  it('should get incomes filtered by boardId and date', async () => {
    const today = new Date();
    const income1: Income = {
      id: uuidv4(),
      name: 'Board1 income',
      amount: 100,
      date: today,
      recurrence: Recurrence.Once,
      boardId: 'board1'
    };
    const income2: Income = {
      id: uuidv4(),
      name: 'Board2 income',
      amount: 200,
      date: today,
      recurrence: Recurrence.Once,
      boardId: 'board2'
    };

    await repo.create(income1);
    await repo.create(income2);

    const params: PaginationParams = {offset: 0, limit: 10};
    const result = await repo.getIncomesPaginated(params, 'board1', new Date(today.getFullYear(), 0), new Date(today.getFullYear(), 11));

    expect(result.items.length).toBe(1);
    expect(result.items[0].boardId).toBe('board1');
  });
});
