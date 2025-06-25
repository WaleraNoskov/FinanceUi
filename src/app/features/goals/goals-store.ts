import {computed, Inject, Injectable, signal} from '@angular/core';
import {Goal} from '../../core/entities/goal';
import {IGoalService} from '../../core/services/goal.service';
import {GOAL_SERVICE} from "../../core/services/services.injection-tokens";

@Injectable({providedIn: 'root'})
export class GoalStore {
  private goals = signal<Goal[]>([]);
  private loading = signal(false);

  readonly goalList = computed(() => this.goals());
  readonly isLoading = computed(() => this.loading());

  constructor(@Inject(GOAL_SERVICE) private readonly service: IGoalService) {
  }

  loadGoals(offset = 0, limit = 20) {
    this.loading.set(true);
    this.service.getGoals(offset, limit)
      .then(data => {
        this.goals.set(data);
        this.loading.set(false);
      });
  }

  addGoal(goal: Goal) {
    this.service.create(goal)
      .then(() => this.goals.update(list => [...list, goal]));
  }

  updateGoal(goal: Goal) {
    this.service.update(goal)
      .then(() => this.goals.update(list => {
        const index = list.indexOf(list.filter(goal => goal.id === goal.id)[0])
        list[index] = goal;
        return list;
      }));
  }

  deleteGoal(id: string) {
    this.service.delete(id)
      .then(() => this.goals.update(list => list.filter(g => g.id !== id)));
  }
}
