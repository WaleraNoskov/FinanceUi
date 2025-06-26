import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Goal} from '../../core/entities/goal';
import {IGoalService} from '../../core/services/goal.service';
import {GOAL_SERVICE} from "../../core/services/services.injection-tokens";
import {PaginationParams} from '../../core/contracts/pagination-params';

@Injectable({providedIn: 'root'})
export class GoalStore {
  private readonly service = inject<IGoalService>(GOAL_SERVICE);

  private readonly goals = signal<Goal[]>([]);
  private readonly loading = signal(false);
  private readonly totalCount = signal(0)
  private readonly pagination: WritableSignal<PaginationParams> = signal({offset: 0, limit: 10});

  readonly goalList = computed(() => this.goals());
  readonly isLoading = computed(() => this.loading());
  readonly totalGoalsCount = computed(() => this.totalCount());
  readonly currentPagination = computed(() => this.pagination());

  loadGoals(offset = 0, limit = 10): void {
    this.pagination.set({offset, limit});
    this.loading.set(true);
    this.service.getGoals({offset: offset, limit: limit}, '')
      .then(data => {
        this.goals.set(data.items)
        this.totalCount.set(data.total)
      })
      .finally(() => this.loading.set(false));
  }

  refresh(): void {
    const {offset, limit} = this.pagination();
    this.loadGoals(offset, limit);
  }

  async addGoal(goal: Goal): Promise<void> {
    await this.service.create(goal);
    return this.refresh();
  }

  async updateGoal(goal: Goal): Promise<void> {
    await this.service.update(goal);
    return this.refresh();
  }

  async deleteGoal(id: string): Promise<void> {
    await this.service.delete(id);
    return this.refresh();
  }
}
