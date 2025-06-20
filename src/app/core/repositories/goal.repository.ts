import {Goal} from '../entities/goal';

export interface IGoalRepository{
  getAll(): Promise<Goal[]>;
  getById(id: string): Promise<Goal|null>;
  save(goal: Goal): Promise<void>;
  delete(goalId: string): Promise<void>;
}
