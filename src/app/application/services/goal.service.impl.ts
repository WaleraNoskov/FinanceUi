import {Goal} from '../../core/entities/goal';
import {IGoalService} from '../../core/services/goal.service';
import {Inject, Injectable} from '@angular/core';
import {IGoalRepository} from '../../core/repositories/goal.repository';
import {GOAL_REPOSITORY} from '../../core/repositories/repositories.injection-tokens';
import {PaginationParams} from '../../core/contracts/pagination-params';
import {PaginationResult} from '../../core/contracts/pagination-result';

@Injectable({providedIn: 'root'})
export class GoalService implements IGoalService {

  constructor(@Inject(GOAL_REPOSITORY) private readonly goalRepository: IGoalRepository) {
  }

  getGoals(pagination: PaginationParams, boardId: string): Promise<PaginationResult<Goal>> {
    return this.goalRepository.getAll(pagination, boardId);
  }

  getById(id: string): Promise<Goal | undefined> {
    return this.goalRepository.getById(id);
  }

  create(goal: Goal): Promise<string> {
    return this.goalRepository.add(goal);
  }

  update(goal: Goal): Promise<void> {
    return this.goalRepository.update(goal);
  }

  delete(id: string): Promise<void> {
    return this.goalRepository.delete(id);
  }
}
