import { Goal } from '../../core/entities/goal';
import {IGoalService} from '../../core/services/goal.service';

export class GoalService implements IGoalService {
    getAll(): Promise<Goal[]> {
        throw new Error('Method not implemented.');
    }
    getById(id: string): Promise<Goal> {
        throw new Error('Method not implemented.');
    }
    add(goal: Goal): Promise<void> {
        throw new Error('Method not implemented.');
    }
    update(goalId: string, goal: Goal): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(goalId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
