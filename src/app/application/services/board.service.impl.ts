import {PaginationParams} from '../../core/contracts/pagination-params';
import {PaginationResult} from '../../core/contracts/pagination-result';
import {Board} from '../../core/entities/board';
import {IBoardService} from '../../core/services/board.service';
import {Inject, Injectable} from '@angular/core';
import {BOARD_REPOSITORY} from '../../core/repositories/repositories.injection-tokens';
import {IBoardRepository} from '../../core/repositories/board.repository';

@Injectable({providedIn: 'root'})
export class BoardService implements IBoardService {

  constructor(@Inject(BOARD_REPOSITORY) private readonly repository: IBoardRepository) {
  }

  async getBoards(pagination: PaginationParams): Promise<PaginationResult<Board>> {
    return await this.repository.getAll(pagination)
  }

  async getById(id: string): Promise<Board | undefined> {
    return await this.repository.getById(id);
  }

  async create(board: Board): Promise<string> {
    return await this.repository.add(board);
  }

  async update(board: Board): Promise<void> {
    return await this.repository.update(board);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
