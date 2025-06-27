import {computed, Inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Goal} from '../../core/entities/goal';
import {IGoalService} from '../../core/services/goal.service';
import {GOAL_SERVICE} from "../../core/services/services.injection-tokens";
import {PaginationParams} from '../../core/contracts/pagination-params';

@Injectable({providedIn: 'root'})
export class GoalStore {
  constructor(@Inject(GOAL_SERVICE) private readonly service: IGoalService) {
  }

  private readonly goals = signal<Goal[]>([]);
  private readonly loading = signal(false);
  private readonly totalCount = signal(0)
  private readonly pagination: WritableSignal<PaginationParams> = signal({offset: 0, limit: 10});

  readonly goalList = computed(() => this.goals());
  readonly isLoading = computed(() => this.loading());
  readonly totalGoalsCount = computed(() => this.totalCount());
  readonly currentPagination = computed(() => this.pagination());

  async loadGoals(offset = 0, limit = 10): Promise<void> {
    this.pagination.set({offset, limit});
    this.loading.set(true);

    const goals = await this.service.getGoals({offset:offset, limit: limit}, '');
    this.goals.set(goals.items);
    this.totalCount.set(goals.total);

    this.loading.set(false);
  }

  async refreshGoals(): Promise<void> {
    const {offset, limit} = this.pagination();
    await this.loadGoals(offset, limit);
  }

  async addGoal(goal: Goal): Promise<void> {
    await this.service.create(goal);
    return this.refreshGoals();
  }

  async updateGoal(goal: Goal): Promise<void> {
    await this.service.update(goal);
    return this.refreshGoals();
  }

  async deleteGoal(id: string): Promise<void> {
    await this.service.delete(id);
    return this.refreshGoals();
  }
}
