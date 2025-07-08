import {Component, computed, effect, Input} from '@angular/core';
import {BoardStore} from '../../board-store';
import {AddOrEditBoardDialogService} from '../add-or-edit-board-service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Board} from '../../../../core/entities/board';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DeleteBoardDialogService} from '../delete-board-dialog-service';
import {MatList, MatListItem, MatListItemMeta, MatListItemTitle} from '@angular/material/list';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-boards-management-widget',
  imports: [
    MatIcon,
    MatPaginator,
    MatButton,
    MatIconButton,
    MatList,
    MatListItem,
    MatListItemMeta,
    MatListItemTitle,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: 'boards-management-widget.html',
  styleUrl: 'boards-management-widget.scss'
})
export class BoardsManagementWidget {
  @Input() fixedPageSize?: number | null;

  pageIndex = computed(() => this.store.getPagination().offset / this.store.getPagination().limit);
  pageSize = computed(() => this.store.getPagination().limit);

  constructor(
    public store: BoardStore,
    private readonly addOrEditBoardDialogService: AddOrEditBoardDialogService,
    private readonly deleteBoardDialogService: DeleteBoardDialogService
  ) {
    this.registerEffects()
  }

  private registerEffects() {
    effect(() => this.store.loadBoards(0, this.fixedPageSize ?? this.pageSize()));
  }

  async onPageChange(event: PageEvent) {
    const offset = event.pageIndex * event.pageSize;
    await this.store.loadBoards(offset, event.pageSize);
  }

  async openAddDialog() {
    this.addOrEditBoardDialogService.open().subscribe(async board => {
      if (board)
        await this.store.addBoard(board);
    })
  }

  async update(board: Board) {
    this.addOrEditBoardDialogService.open(board).subscribe(async board => {
      if (board)
        await this.store.updateBoard(board);
    });
  }

  async delete(board: Board) {
    this.deleteBoardDialogService.openDeleteDialog(board.title)
      .subscribe(async title => {
        if(title === board.title)
          await this.store.deleteBoard(board.id);
      })
  }
}
