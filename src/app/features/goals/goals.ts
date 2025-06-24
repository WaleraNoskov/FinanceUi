import {Component, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoalStore} from './goals-store';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle
} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  standalone: true,
  selector: 'app-goals',
  imports: [CommonModule, MatButton, MatList, MatListItem, MatListItemTitle, MatListItemLine, MatListItemMeta, MatIconButton, MatIcon, MatFabButton],
  template: `
      <div class="goal-container">
          <div>
              <button class="fab-button" matFab (click)="create()">
                  <mat-icon>add</mat-icon>
              </button>

              <div class="goal-list-wrapper">
                  <mat-list>
                      @for (goal of store.goalList(); track goal.id) {
                          <mat-list-item>
                              <span matListItemTitle>{{ goal.title }}</span>
                              <span matListItemLine>{{ goal.currentAmount }} of {{ goal.targetAmount }}</span>
                              <div matListItemMeta>
                                  <button matIconButton aria-label="Delete goal" (click)="delete(goal.id)">
                                      <mat-icon>delete</mat-icon>
                                  </button>
                              </div>
                          </mat-list-item>
                      }
                  </mat-list>
              </div>
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
