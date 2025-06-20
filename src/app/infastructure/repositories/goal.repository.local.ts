import { Injectable } from '@angular/core';
import { Goal } from '../../core/entities/goal';
import { IGoalRepository } from '../../core/repositories/goal.repository';

@Injectable()
export class LocalGoalRepository implements IGoalRepository {
  private goals: Goal[] = [];

  async getAll(): Promise<Goal[]> {
    return this.goals;
  }

  async getById(id: string): Promise<Goal | null> {
    return this.goals.find(g => g.id === id) ?? null;
  }

  async save(goal: Goal): Promise<void> {
    const index = this.goals.findIndex(g => g.id === goal.id);
    if (index >= 0) this.goals[index] = goal;
    else this.goals.push(goal);
  }

  async delete(id: string): Promise<void> {
    this.goals = this.goals.filter(g => g.id !== id);
  }
}
