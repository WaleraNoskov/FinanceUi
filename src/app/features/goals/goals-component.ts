import {Component, computed, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoalStore} from './goals-store';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {GoalsList} from './goals-list/goals-list';
import {AddOrEditGoalDialogService} from './add-or-edit-goal/add-or-edit-goal-dialog-service';
import {Goal} from '../../core/entities/goal';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  standalone: true,
  selector: 'app-goals',
  imports: [CommonModule, MatIcon, MatFabButton, GoalsList, MatPaginator],
  template: `
    <div class="goal-container">
      <div>
        <button class="fab-button" matFab (click)="openAddDialog()">
          <mat-icon>add</mat-icon>
        </button>

        <app-goals-list [goalList]="store.goalList()" (deleted)="delete($event)"
                        (needToUpdate)="onUpdateEmitted($event)"/>
      </div>
    </div>

    <mat-paginator
      [pageSize]="pageSize()"
      [pageIndex]="pageIndex()"
      [length]="store.totalGoalsCount()"
      [pageSizeOptions]="[5, 10, 20]"
      (page)="onPageChange($event)">
    </mat-paginator>
  `,
  styleUrl: './goals-component.scss'
})

export class GoalsComponent {
  pageIndex = computed(() => this.store.currentPagination().offset / this.store.currentPagination().limit);
  pageSize = computed(() => this.store.currentPagination().limit);

  constructor(
    public store: GoalStore,
    private readonly addOrEditGoalDialogService: AddOrEditGoalDialogService
  ) {
    this.registerEffects()
  }

  private registerEffects() {
    effect(() => this.store.loadGoals());
  }

  onPageChange(event: PageEvent) {
    const offset = event.pageIndex * event.pageSize;
    this.store.loadGoals(offset, event.pageSize);
  }

  openAddDialog() {
    this.addOrEditGoalDialogService.open().subscribe(goal => {
      if (goal)
        this.store.addGoal(goal);
    })
  }

  onUpdateEmitted(goal: Goal) {
    this.addOrEditGoalDialogService.open(goal).subscribe(goal => {
      if (goal)
        this.store.updateGoal(goal);
    });
  }

  async delete(goal: Goal) {
    await this.store.deleteGoal(goal.id);
  }
}
