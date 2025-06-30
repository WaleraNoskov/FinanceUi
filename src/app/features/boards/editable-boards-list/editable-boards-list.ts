import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Board} from '../../../core/entities/board';
import {MatIconButton} from '@angular/material/button';
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-editable-boards-list',
  imports: [
    MatIcon,
    MatIconButton,
    MatList,
    MatListItem,
    MatListItemMeta,
    MatListItemTitle
  ],
  template: `
    <div>
      <mat-list>
        @for (board of boardList; track board.id) {
          <mat-list-item>
            <span matListItemTitle>{{ board.title }}</span>
<!--            <span matListItemLine>{{ board.currentAmount }} of {{ board.targetAmount }}</span>-->
            <div matListItemMeta>
              <button matIconButton aria-label="Select board" (click)="setCurrent(board)">
                <mat-icon>check</mat-icon>
              </button>
              <button matIconButton aria-label="Edit board" (click)="update(board)">
                <mat-icon>edit</mat-icon>
              </button>
              <button matIconButton aria-label="Delete board" (click)="delete(board)">
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
export class EditableBoardsList {
  @Input() boardList: Board[] = [];
  @Output() deleted: EventEmitter<Board> = new EventEmitter();
  @Output() needToUpdate: EventEmitter<Board> = new EventEmitter();
  @Output() selected: EventEmitter<Board> = new EventEmitter();

  update(board: Board) {
    this.needToUpdate.emit(board);
  }

  delete(board: Board) {
    this.deleted.emit(board);
  }

  setCurrent(board: Board) {
    this.selected.emit(board);
  }
}
