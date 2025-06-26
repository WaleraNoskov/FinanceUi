import {Goal} from '../entities/goal';
import {PaginationParams} from '../contracts/pagination-params';
import {PaginationResult} from '../contracts/pagination-result';

export interface IGoalService {
  getGoals(pagination: PaginationParams, boardId: string): Promise<PaginationResult<Goal>>;

  getById(id: string): Promise<Goal | undefined>;

  create(goal: Goal): Promise<string>;

  update(goal: Goal): Promise<void>;

  delete(id: string): Promise<void>;
}
