import {computed, Inject, Injectable, signal, WritableSignal} from '@angular/core';
import {BOARD_SERVICE} from '../../core/services/services.injection-tokens';
import {PaginationParams} from '../../core/contracts/pagination-params';
import {IBoardService} from '../../core/services/board.service';
import {Board} from '../../core/entities/board';

@Injectable({providedIn: 'root'})
export class BoardStore {
  constructor(@Inject(BOARD_SERVICE) private readonly service: IBoardService) {
  }

  private readonly boards = signal<Board[]>([]);
  private readonly loading = signal(false);
  private readonly totalCount = signal(0)
  private readonly pagination: WritableSignal<PaginationParams> = signal({offset: 0, limit: 10});
  private readonly selected = signal<Board | null>(null);

  readonly boardList = computed(() => this.boards());
  readonly isLoading = computed(() => this.loading());
  readonly totalBoardsCount = computed(() => this.totalCount());
  readonly currentPagination = computed(() => this.pagination());
  readonly selectedBoard = computed(() => this.selected());

  async loadBoards(offset = 0, limit = 10): Promise<void> {
    this.pagination.set({offset, limit});
    this.loading.set(true);

    const boards = await this.service.getBoards({offset:offset, limit: limit});
    this.boards.set(boards.items);
    this.totalCount.set(boards.total);

    this.loading.set(false);
  }

  async refresh(): Promise<void> {
    const {offset, limit} = this.pagination();
    await this.loadBoards(offset, limit);
  }

  async addBoard(board: Board): Promise<void> {
    console.log(board)
    await this.service.create(board);
    return this.refresh();
  }

  async updateBoard(board: Board): Promise<void> {
    await this.service.update(board);
    return this.refresh();
  }

  async deleteBoard(id: string): Promise<void> {
    await this.service.delete(id);
    return this.refresh();
  }

  setSelectedBoard(board: Board) {
    this.selected.set(board);
    console.log(this.selectedBoard())
  }
}
