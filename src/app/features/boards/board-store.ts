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
  readonly getBoards = computed(() => this.boards());

  private readonly isLoading = signal(false);
  readonly getIsLoading = computed(() => this.isLoading());

  private readonly totalCount = signal(0);
  readonly getBoardsCount = computed(() => this.totalCount());

  private readonly pagination: WritableSignal<PaginationParams> = signal({offset: 0, limit: 10});
  readonly getPagination = computed(() => this.pagination());

  private readonly selected = signal<Board | null>(null);
  readonly getSelected = computed(() => this.selected());

  async loadBoards(offset = 0, limit = 10): Promise<void> {
    this.pagination.set({offset, limit});
    this.isLoading.set(true);

    const boards = await this.service.getBoards({offset: offset, limit: limit});
    this.boards.set(boards.items);
    this.totalCount.set(boards.total);

    if(this.selected() == null && this.boards().length > 0)
      this.selected.set(this.boards()[0])

    this.isLoading.set(false);
  }

  async addBoard(board: Board): Promise<void> {
    await this.service.create(board);

    const {offset, limit} = this.pagination();
    await this.loadBoards(offset, limit);
  }

  async updateBoard(board: Board): Promise<void> {
    await this.service.update(board);

    const {offset, limit} = this.pagination();
    await this.loadBoards(offset, limit);
  }

  async deleteBoard(id: string): Promise<void> {
    await this.service.delete(id);

    this.selected.set(null);

    const {offset, limit} = this.pagination();
    await this.loadBoards(offset, limit);
  }

  setSelectedBoard(board: Board) {
    if (this.getSelected()?.id == board.id)
      return;
    this.selected.set(board);
  }
}
