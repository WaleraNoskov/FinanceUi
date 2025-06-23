import {Goal} from '../entities/goal';


export interface IGoalRepository {
  getAll(offset: number, limit: number): Promise<Goal[]>;
  getById(id: string): Promise<Goal | undefined>;
  add(goal: Goal): Promise<void>;
  update(goal: Goal): Promise<void>;
  delete(id: string): Promise<void>;
}
