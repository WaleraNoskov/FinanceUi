import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatList, MatListItem, MatListItemLine, MatListItemMeta, MatListItemTitle} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {Goal} from '../../../core/entities/goal';

@Component({
  selector: 'app-goals-list',
  imports: [
    MatIcon,
    MatIconButton,
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemMeta,
    MatListItemTitle
  ],
  template: `
    <div>
      <mat-list>
        @for (goal of goalList; track goal.id) {
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
  `,
  styles: ``
})
export class GoalsList {
  @Input() goalList: Goal[] = [];
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  delete(id: string) {
    this.deleted.emit(id);
  }
}
