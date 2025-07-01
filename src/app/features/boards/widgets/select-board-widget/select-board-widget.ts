import {Component, computed, effect} from '@angular/core';
import {BoardStore} from '../../board-store';
import {MatExpansionPanel, MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-select-board-widget',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatSelectionList,
    MatListOption,
    MatPaginator
  ],
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header><span>{{ store.getSelected()?.title }}</span></mat-expansion-panel-header>

      <mat-selection-list [multiple]="false">
        @for (board of store.getBoards(); track board.id) {
          <mat-list-option [value]="board" [selected]="store.getSelected()?.id == board.id"
                           (selectedChange)="store.setSelectedBoard(board)">
            <span matListItemTitle>{{ board.title }}</span>
          </mat-list-option>
        }
      </mat-selection-list>
      <mat-paginator
        [pageSize]="5"
        [pageIndex]="pageIndex()"
        [length]="store.getBoardsCount()"
        (page)="onPageChange($event)">
      </mat-paginator>
    </mat-expansion-panel>
  `,
  styles: ``
})
export class SelectBoardWidget {
  pageIndex = computed(() => this.store.getPagination().offset / this.store.getPagination().limit);

  constructor(public readonly store: BoardStore) {
    this.registerEffects()
  }

  private registerEffects() {
    effect(() => this.store.loadBoards(0, 5));
  }

  async onPageChange(event: PageEvent) {
    const offset = event.pageIndex * event.pageSize;
    await this.store.loadBoards(offset, 5);
  }
}
