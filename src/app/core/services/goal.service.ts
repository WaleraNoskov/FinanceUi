import {Goal} from '../entities/goal';

export interface IGoalService {
  getAll(): Promise<Goal[]>;
  getById(id: string): Promise<Goal>;
  add(goal: Goal): Promise<void>;
  update(goalId: string, goal: Goal): Promise<void>;
  delete(goalId: string): Promise<void>;
}
