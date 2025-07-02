import {Component, computed, effect, Input} from '@angular/core';
import {BoardStore} from '../../board-store';
import {AddOrEditBoardDialogService} from '../add-or-edit-board-service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Board} from '../../../../core/entities/board';
import {EditableBoardsList} from '../../components/editable-boards-list/editable-boards-list';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DeleteBoardDialog} from '../../components/delete-board-dialog/delete-board-dialog';
import {DeleteBoardDialogService} from '../delete-board-dialog-service';
import {async} from 'rxjs';

@Component({
  selector: 'app-boards-management-widget',
  imports: [
    EditableBoardsList,
    MatIcon,
    MatPaginator,
    MatButton
  ],
  template: `
    <div class="board-container">
      <button class="add-button" matButton="outlined" (click)="openAddDialog()">
        <mat-icon>add</mat-icon>
        <span>Add</span>
      </button>

      <app-editable-boards-list [boardList]="store.getBoards()" (deleted)="delete($event)"
                                (selected)="store.setSelectedBoard($event)"
                                (needToUpdate)="onUpdateEmitted($event)"/>
    </div>

    <mat-paginator
      [pageSize]="fixedPageSize == null ? pageSize() : fixedPageSize"
      [pageIndex]="pageIndex()"
      [length]="store.getBoardsCount()"
      [hidePageSize]="true"
      [pageSizeOptions]="[5, 10, 20]"
      (page)="onPageChange($event)">
    </mat-paginator>
  `,
  styles: `
    .board-container {
      display: flex;
      flex-direction: column;
    }

    .add-button {
      align-self: end;
    }
  `
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

  async onUpdateEmitted(board: Board) {
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
