import {Component, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoalStore} from './goals-store';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {GoalsList} from './goals-list/goals-list';
import {AddOrEditGoalDialogService} from './add-or-edit-goal/add-or-edit-goal-dialog-service';

@Component({
  standalone: true,
  selector: 'app-goals',
  imports: [CommonModule, MatIcon, MatFabButton, GoalsList],
  template: `
    <div class="goal-container">
      <div>
        <button class="fab-button" matFab (click)="openAddOrEdit()">
          <mat-icon>add</mat-icon>
        </button>

        <app-goals-list [goalList]="store.goalList()" (deleted)="delete($event)"/>
      </div>
    </div>
  `,
  styleUrl: './goals.scss'
})

export class Goals {
  constructor(
    public store: GoalStore,
    private readonly addOrEditGoalDialogService: AddOrEditGoalDialogService) {
    effect(() => this.store.loadGoals());
  }

  openAddOrEdit() {
    this.addOrEditGoalDialogService.open().subscribe(goal => {
      if (goal)
        this.store.addGoal(goal);
    })
  }

  delete(id: string) {
    this.store.deleteGoal(id);
  }
}
