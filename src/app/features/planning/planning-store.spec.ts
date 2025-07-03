import {PlanningStore} from './planning-store';
import {IncomeService} from '../../application/services/income.service.impl';
import {Income} from '../../core/entities/income';
import {v4 as uuidv4} from 'uuid';
import {Recurrence} from '../../core/contracts/recurrence';
import {IIncomeService} from '../../core/services/income.service';

describe('PlanningStore', () => {
  let store: PlanningStore;
  let incomeServiceSpy: jasmine.SpyObj<IncomeService>;

  const fakeIncome: Income = {
    id: uuidv4(),
    name: 'Test Income',
    amount: 1000,
    date: new Date(),
    recurrence: Recurrence.Monthly,
    boardId: 'board-1',
  };

  beforeEach(() => {
    incomeServiceSpy = jasmine.createSpyObj<IncomeService>('IIncomeService', ['create', 'update', 'delete']);
    store = new PlanningStore(incomeServiceSpy);
  });

  it('should call create on incomeService', async () => {
    incomeServiceSpy.create.and.resolveTo('1');

    const result = await store.createIncome(fakeIncome);

    expect(incomeServiceSpy.create).toHaveBeenCalledOnceWith(fakeIncome);
    expect(result).toBe('1');
  });

  it('should call update on incomeService', async () => {
    incomeServiceSpy.update.and.resolveTo();

    await store.updateIncome(fakeIncome);

    expect(incomeServiceSpy.update).toHaveBeenCalledOnceWith(fakeIncome);
  });

  it('should call delete on incomeService with income id', async () => {
    incomeServiceSpy.delete.and.resolveTo();

    await store.deleteIncome(fakeIncome);

    expect(incomeServiceSpy.delete).toHaveBeenCalledOnceWith(fakeIncome.id);
  });
});
