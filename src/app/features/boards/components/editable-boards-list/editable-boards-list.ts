import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Board} from '../../../../core/entities/board';
import {MatIconButton} from '@angular/material/button';
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-editable-boards-list',
  imports: [
    MatIcon,
    MatIconButton,
    MatList,
    MatListItem,
    MatListItemMeta,
    MatListItemTitle,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem
  ],
  template: `
    <div>
      <mat-list>
        @for (board of boardList; track board.id) {
          <mat-list-item>
            <span matListItemTitle>{{ board.title }}</span>
            <div matListItemMeta>
              <button matIconButton [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="update(board)">
                  <mat-icon>edit</mat-icon>
                  <span>Edit</span>
                </button>
                <button mat-menu-item (click)="delete(board)">
                  <mat-icon>delete</mat-icon>
                  <span>Delete</span>
                </button>
              </mat-menu>
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
