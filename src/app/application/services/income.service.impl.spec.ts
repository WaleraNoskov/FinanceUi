import {IncomeService} from './income.service.impl';
import {IIncomeRepository} from '../../core/repositories/IncomeRepository';
import {INCOME_REPOSITORY} from '../../core/repositories/repositories.injection-tokens';
import {TestBed} from '@angular/core/testing';
import {PaginationResult} from '../../core/contracts/pagination-result';
import {Income} from '../../core/entities/income';
import {PaginationParams} from '../../core/contracts/pagination-params';
import {v4 as uuidv4} from 'uuid';
import {Recurrence} from '../../core/contracts/recurrence';

const defaultBoardId = 'defaultBoardId';

describe('IncomeService', () => {
  let service: IncomeService;
  let mockRepository: jasmine.SpyObj<IIncomeRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj<IIncomeRepository>('IIncomeRepository', [
      'getIncomesPaginated', 'getById', 'create', 'update', 'delete'
    ]);

    TestBed.configureTestingModule({
      providers: [
        IncomeService,
        {provide: INCOME_REPOSITORY, useValue: mockRepository}
      ]
    });

    service = TestBed.inject(IncomeService);
  });

  it('should fetch incomes with pagination and date range', async () => {
    const mockIncomes: PaginationResult<Income> = {
      total: 1,
      items: [{
        id: uuidv4(),
        name: 'Salary',
        amount: 1000,
        date: new Date(),
        recurrence: Recurrence.Monthly,
        boardId: defaultBoardId
      }]
    };

    const pagination: PaginationParams = {offset: 0, limit: 10};
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');

    mockRepository.getIncomesPaginated.and.resolveTo(mockIncomes);

    const result = await service.getIncomesPaginated(pagination, defaultBoardId, startDate, endDate);

    expect(mockRepository.getIncomesPaginated).toHaveBeenCalledWith(pagination, defaultBoardId, startDate, endDate);
    expect(result).toEqual(mockIncomes);
  });

  it('should fetch income by id', async () => {
    const mockIncome: Income = {
      id: uuidv4(),
      name: 'Freelance',
      amount: 500,
      date: new Date(),
      recurrence: Recurrence.Once,
      boardId: defaultBoardId
    };

    mockRepository.getById.and.resolveTo(mockIncome);

    const result = await service.getById('1');

    expect(mockRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockIncome);
  });

  it('should create an income', async () => {
    const newIncome: Income = {
      id: uuidv4(),
      name: 'Bonus',
      amount: 200,
      date: new Date(),
      recurrence: Recurrence.Once,
      boardId: defaultBoardId
    };

    mockRepository.create.and.resolveTo('1');

    const result = await service.create(newIncome);

    expect(mockRepository.create).toHaveBeenCalledWith(newIncome);
    expect(result).toBe('1');
  });

  it('should update an income', async () => {
    const updatedIncome: Income = {
      id: uuidv4(),
      name: 'Updated',
      amount: 300,
      date: new Date(),
      recurrence: Recurrence.Monthly,
      boardId: defaultBoardId
    };

    mockRepository.update.and.resolveTo();

    await service.update(updatedIncome);

    expect(mockRepository.update).toHaveBeenCalledWith(updatedIncome);
  });

  it('should delete an income', async () => {
    mockRepository.delete.and.resolveTo();

    await service.delete('3');

    expect(mockRepository.delete).toHaveBeenCalledWith('3');
  });
});
