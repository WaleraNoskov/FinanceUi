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
  public readonly getGoals = computed(() => this.goals());

  private readonly isLoading = signal(false);
  public readonly getIsLoading = computed(() => this.isLoading());

  private readonly totalCount = signal(0);
  public readonly getTotalCount = computed(() => this.totalCount());

  private readonly pagination: WritableSignal<PaginationParams> = signal({offset: 0, limit: 10});
  public readonly getPagination = computed(() => this.pagination());

  private readonly currentBoardId: WritableSignal<string | null> = signal('');
  public readonly getCurrentBoardId = computed(() => this.currentBoardId());

  async loadGoals(offset = 0, limit = 5, boardId: string | null = null): Promise<void> {
    this.pagination.set({offset, limit});
    this.isLoading.set(true);
    this.currentBoardId.set(boardId);

    const goals = await this.service.getGoals({offset:offset, limit: limit}, boardId);
    this.goals.set(goals.items);
    this.totalCount.set(goals.total);

    this.isLoading.set(false);
  }

  async refreshGoals(): Promise<void> {
    const {offset, limit} = this.pagination();
    await this.loadGoals(offset, limit, this.currentBoardId());
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
