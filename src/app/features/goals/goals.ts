import {Component, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoalStore} from './goals-store';
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {GoalsList} from './goals-list/goals-list';

@Component({
  standalone: true,
  selector: 'app-goals',
  imports: [CommonModule, MatIcon, MatFabButton, GoalsList],
  template: `
    <div class="goal-container">
      <div>
        <button class="fab-button" matFab (click)="create()">
          <mat-icon>add</mat-icon>
        </button>

        <app-goals-list [goalList]="store.goalList()" (deleted)="delete($event)"/>
      </div>
    </div>
  `,
  styleUrl: './goals.scss'
})
export class Goals {
  constructor(public store: GoalStore) {
    effect(() => this.store.loadGoals());
  }

  create(){
    this.store.addGoal({id: '', title: 'title', currentAmount: 0, targetAmount: 12000, deadline: new Date()});
  }

  delete(id: string) {
    this.store.deleteGoal(id);
  }
}
