import {Component, computed, effect} from '@angular/core';
import {BoardStore} from '../../board-store';
import {AddOrEditBoardDialogService} from '../add-or-edit-board-service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Board} from '../../../../core/entities/board';
import {EditableBoardsList} from '../../components/editable-boards-list/editable-boards-list';
import {MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-boards-management-widget',
  imports: [
    EditableBoardsList,
    MatFabButton,
    MatIcon,
    MatPaginator
  ],
  template: `
    <div class="board-container">
      <div>
        <button class="fab-button" matFab (click)="openAddDialog()">
          <mat-icon>add</mat-icon>
        </button>

        <app-editable-boards-list [boardList]="store.getBoards()" (deleted)="delete($event)"
                                  (selected)="store.setSelectedBoard($event)"
                                  (needToUpdate)="onUpdateEmitted($event)"/>
      </div>
    </div>

    <mat-paginator
      [pageSize]="pageSize()"
      [pageIndex]="pageIndex()"
      [length]="store.getBoardsCount()"
      [pageSizeOptions]="[5, 10, 20]"
      (page)="onPageChange($event)">
    </mat-paginator>
  `,
  styles: `
    .board-container {
      position: relative;
      height: 100%;
      max-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  `
})
export class BoardsManagementWidget {
  pageIndex = computed(() => this.store.getPagination().offset / this.store.getPagination().limit);
  pageSize = computed(() => this.store.getPagination().limit);

  constructor(
    public store: BoardStore,
    private readonly addOrEditBoardDialogService: AddOrEditBoardDialogService
  ) {
    this.registerEffects()
  }

  private registerEffects() {
    effect(() => this.store.loadBoards());
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
    await this.store.deleteBoard(board.id);
  }
}
