import {GoalStore} from './goals-store';
import {IGoalService} from '../../core/services/goal.service';
import {Goal} from '../../core/entities/goal';

describe('GoalStore', () => {
  let store: GoalStore;
  let mockService: jasmine.SpyObj<IGoalService>;
  beforeEach(() => {
    // Мокаем GoalService и его методы
    mockService = jasmine.createSpyObj('GoalService', ['getGoals', 'create', 'update', 'delete']);

    // Возвращаем мок с ожидаемым результатом
    mockService.getGoals.and.resolveTo({ items: [], total: 0 });

    // получаем через DI
    store = new GoalStore(mockService);
  });

  it('should load goals and update state', async () => {
    const goals: Goal[] = [
      { id: '1', title: 'Test', currentAmount: 10, targetAmount: 100, deadline: new Date(), boardId: '1' }
    ];

    mockService.getGoals.and.resolveTo({ items: goals, total: 1 });

    await store.loadGoals();

    expect(store.getGoals()).toEqual(goals);
    expect(store.getTotalCount()).toBe(1);
  });

  it('should add goal and refresh list', async () => {
    const goals: Goal[] = [
      { id: '1', title: 'Test', currentAmount: 10, targetAmount: 100, deadline: new Date(), boardId: '1' }
    ];

    mockService.create.and.resolveTo('3');
    mockService.getGoals.and.resolveTo({ items: goals, total: 2 });

    await store.addGoal(goals[0]);

    expect(mockService.create).toHaveBeenCalled();
    expect(mockService.getGoals).toHaveBeenCalled();
  });

  it('should update goal and refresh list', async () => {
    const goals: Goal[] = [
      { id: '1', title: 'Test', currentAmount: 10, targetAmount: 100, deadline: new Date(), boardId: '1' }
    ];

    mockService.update.and.resolveTo();
    mockService.getGoals.and.resolveTo({ items: goals, total: 2 });

    await store.updateGoal(goals[0]);

    expect(mockService.update).toHaveBeenCalledWith(goals[0]);
    expect(mockService.getGoals).toHaveBeenCalled();
  });

  it('should delete goal and refresh list', async () => {
    const goals: Goal[] = [
      { id: '1', title: 'Test', currentAmount: 10, targetAmount: 100, deadline: new Date(), boardId: '1' }
    ];

    mockService.delete.and.resolveTo();
    mockService.getGoals.and.resolveTo({ items: goals, total: 2 });

    await store.deleteGoal('1');

    expect(mockService.delete).toHaveBeenCalledWith('1');
    expect(mockService.getGoals).toHaveBeenCalled();
  });

  it('should refresh using stored pagination', async () => {
    const goals: Goal[] = [
      { id: '1', title: 'Test', currentAmount: 10, targetAmount: 100, deadline: new Date(), boardId: '1' }
    ];

    mockService.getGoals.and.resolveTo({ items: goals, total: 2 });

    await store.loadGoals(5, 10);
    await store.refreshGoals();

    expect(mockService.getGoals).toHaveBeenCalledWith({ offset: 5, limit: 10 }, '');
  });
});
