import {PlanningStore} from './planning-store';
import {IncomeService} from '../../application/services/income.service.impl';
import {Income} from '../../core/entities/income';
import {v4 as uuidv4} from 'uuid';

describe('PlanningStore', () => {
  let store: PlanningStore;
  let incomeServiceSpy: jasmine.SpyObj<IncomeService>;

  beforeEach(() => {
    incomeServiceSpy = jasmine.createSpyObj('IncomeService', ['getIncomes']);
    store = new PlanningStore(incomeServiceSpy);
  });

  it('should return sorted income days', () => {
    const mockIncomes: Income[] = [
      { id: uuidv4(), name: 'Salary', amount: 1000, date: new Date('2024-05-01'), recurrence: 0, boardId: '1' },
      { id: uuidv4(), name: 'Bonus', amount: 500, date: new Date('2024-05-03'), recurrence: 0, boardId: '1' },
      { id: uuidv4(), name: 'Freelance', amount: 800, date: new Date('2024-05-01'), recurrence: 0, boardId: '1' },
    ];

    const days = store.getSortedIncomeDays(mockIncomes);
    expect(days.length).toBe(2);
    expect(days[0].toDateString()).toBe(new Date('2024-05-01').toDateString());
    expect(days[1].toDateString()).toBe(new Date('2024-05-03').toDateString());
  });
});
