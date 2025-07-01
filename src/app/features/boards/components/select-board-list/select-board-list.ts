import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {Board} from '../../../../core/entities/board';

@Component({
  selector: 'app-select-board-list',
  imports: [
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption
  ],
  template: `
    <mat-form-field>
      <mat-label>Current board</mat-label>
      <mat-select [value]="currentBoard?.id">
        @for (board of boards; track board.id) {
          <mat-option [value]="board.id" (click)="selected.emit(board)">{{ board.title }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: ``
})
export class SelectBoardList {
  @Input() boards: Board[] = [];
  @Input() currentBoard?: Board | null;
  @Output() selected: EventEmitter<Board> = new EventEmitter();
}
