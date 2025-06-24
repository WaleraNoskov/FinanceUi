import {Goal} from '../../core/entities/goal';
import {IGoalService} from '../../core/services/goal.service';
import {Inject, Injectable} from '@angular/core';
import {IGoalRepository} from '../../core/repositories/goal.repository';
import {GOAL_REPOSITORY} from '../../core/repositories/repositories.injection-tokens';

@Injectable({providedIn: 'root'})
export class GoalService implements IGoalService {

  constructor(@Inject(GOAL_REPOSITORY) private readonly goalRepository: IGoalRepository) {
  }

  getGoals(offset = 0, limit = 20): Promise<Goal[]> {
    return this.goalRepository.getAll(offset, limit);
  }

  getById(id: string): Promise<Goal | undefined> {
    return this.goalRepository.getById(id);
  }

  create(goal: Goal): Promise<void> {
    return this.goalRepository.add(goal);
  }

  update(goal: Goal): Promise<void> {
    return this.goalRepository.update(goal);
  }

  delete(id: string): Promise<void> {
    return this.goalRepository.delete(id);
  }
}
