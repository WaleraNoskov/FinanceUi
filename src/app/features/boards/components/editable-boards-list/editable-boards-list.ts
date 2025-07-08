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
  templateUrl: './editable-boards-list.html',
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
