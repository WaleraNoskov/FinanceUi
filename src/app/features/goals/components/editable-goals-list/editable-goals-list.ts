import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatList, MatListItem, MatListItemLine, MatListItemMeta, MatListItemTitle} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {Goal} from '../../../../core/entities/goal';

@Component({
  selector: 'app-editable-goals-list',
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
              <button matIconButton aria-label="Edit goal" (click)="update(goal)">
                <mat-icon>edit</mat-icon>
              </button>
              <button matIconButton aria-label="Delete goal" (click)="delete(goal)">
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
export class EditableGoalsList {
  @Input() goalList: Goal[] = [];
  @Output() deleted: EventEmitter<Goal> = new EventEmitter();
  @Output() needToUpdate: EventEmitter<Goal> = new EventEmitter();

  update(goal: Goal) {
    this.needToUpdate.emit(goal);
  }

  delete(goal: Goal) {
    this.deleted.emit(goal);
  }
}
