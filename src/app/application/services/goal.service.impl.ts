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

  async getGoals(pagination: PaginationParams, boardId?: string | null): Promise<PaginationResult<Goal>> {
    return await this.goalRepository.getAll(pagination, boardId);
  }

  async getById(id: string): Promise<Goal | undefined> {
    return await this.goalRepository.getById(id);
  }

  async create(goal: Goal): Promise<string> {
    return await this.goalRepository.add(goal);
  }

  async update(goal: Goal): Promise<void> {
    return await this.goalRepository.update(goal);
  }

  async delete(id: string): Promise<void> {
    return await this.goalRepository.delete(id);
  }
}
