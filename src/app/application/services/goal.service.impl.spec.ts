import {GoalService} from './goal.service.impl';
import {IGoalRepository} from '../../core/repositories/goal.repository';
import {TestBed} from '@angular/core/testing';
import {Goal} from '../../core/entities/goal';
import {GOAL_REPOSITORY} from '../../core/repositories/repositories.injection-tokens';
import {PaginationResult} from '../../core/contracts/pagination-result';

describe('GoalService', () => {
  let service: GoalService;
  let mockRepository: jasmine.SpyObj<IGoalRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj<IGoalRepository>('IGoalRepository', [
      'getAll', 'getById', 'add', 'update', 'delete'
    ]);

    TestBed.configureTestingModule({
      providers: [
        GoalService,
        {provide: GOAL_REPOSITORY, useValue: mockRepository}
      ]
    });

    service = TestBed.inject(GoalService);
  });

  it('should fetch goals with pagination', async () => {
    const mockGoals: PaginationResult<Goal> = {
      total: 1,
      items: [{id: '1', title: 'Test', targetAmount: 100, currentAmount: 0, deadline: new Date()}]
    };
    mockRepository.getAll.and.resolveTo(mockGoals);

    const result = await service.getGoals({offset: 0, limit: 10});

    expect(mockRepository.getAll).toHaveBeenCalledWith({offset: 0, limit: 10});
    expect(result).toEqual(mockGoals);
  });

  it('should fetch goal by id', async () => {
    const mockGoal: Goal = {id: '1', title: 'Test', targetAmount: 100, currentAmount: 0, deadline: new Date()};
    mockRepository.getById.and.resolveTo(mockGoal);

    const result = await service.getById('1');

    expect(mockRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockGoal);
  });

  it('should create a goal', async () => {
    const newGoal: Goal = {id: '2', title: 'New', targetAmount: 200, currentAmount: 0, deadline: new Date()};
    mockRepository.add.and.resolveTo();

    await service.create(newGoal);

    expect(mockRepository.add).toHaveBeenCalledWith(newGoal);
  });

  it('should update a goal', async () => {
    const updatedGoal: Goal = {id: '3', title: 'Updated', targetAmount: 300, currentAmount: 100, deadline: new Date()};
    mockRepository.update.and.resolveTo();

    await service.update(updatedGoal);

    expect(mockRepository.update).toHaveBeenCalledWith(updatedGoal);
  });

  it('should delete a goal', async () => {
    mockRepository.delete.and.resolveTo();

    await service.delete('4');

    expect(mockRepository.delete).toHaveBeenCalledWith('4');
  });
});
