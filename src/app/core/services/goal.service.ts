import {Goal} from '../entities/goal';

export interface IGoalService {
  getGoals(offset: number, limit: number): Promise<Goal[]>;

  getById(id: string): Promise<Goal | undefined>;

  create(goal: Goal): Promise<string>;

  update(goal: Goal): Promise<void>;

  delete(id: string): Promise<void>;
}
