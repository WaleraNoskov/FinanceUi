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
  templateUrl: './select-board-widget.html',
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
