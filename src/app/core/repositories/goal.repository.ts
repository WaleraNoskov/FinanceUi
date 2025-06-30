import {Goal} from '../entities/goal';
import {PaginationParams} from '../contracts/pagination-params';
import {PaginationResult} from '../contracts/pagination-result';


export interface IGoalRepository {
  getAll(pagination: PaginationParams, boardId?: string | null): Promise<PaginationResult<Goal>>;
  getById(id: string): Promise<Goal | undefined>;
  add(goal: Goal): Promise<string>;
  update(goal: Goal): Promise<void>;
  delete(id: string): Promise<void>;
}
