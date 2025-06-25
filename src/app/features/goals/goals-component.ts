import {Component, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoalStore} from './goals-store';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {GoalsList} from './goals-list/goals-list';
import {AddOrEditGoalDialogService} from './add-or-edit-goal/add-or-edit-goal-dialog-service';
import {Goal} from '../../core/entities/goal';

@Component({
  standalone: true,
  selector: 'app-goals',
  imports: [CommonModule, MatIcon, MatFabButton, GoalsList],
  template: `
    <div class="goal-container">
      <div>
        <button class="fab-button" matFab (click)="openAddDialog()">
          <mat-icon>add</mat-icon>
        </button>

        <app-goals-list [goalList]="store.goalList()" (deleted)="delete($event)" (needToUpdate)="onUpdateEmitted($event)"/>
      </div>
    </div>
  `,
  styleUrl: './goals-component.scss'
})

export class GoalsComponent {
  constructor(
    public store: GoalStore,
    private readonly addOrEditGoalDialogService: AddOrEditGoalDialogService) {
    effect(() => this.store.loadGoals());
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

  delete(goal: Goal) {
    this.store.deleteGoal(goal.id);
  }
}
