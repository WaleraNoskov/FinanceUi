import {PaginationParams} from '../contracts/pagination-params';
import {PaginationResult} from '../contracts/pagination-result';
import {Board} from '../entities/board';

export interface IBoardService {
  getBoards(pagination: PaginationParams): Promise<PaginationResult<Board>>;

  getById(id: string): Promise<Board | undefined>;

  create(goal: Board): Promise<string>;

  update(goal: Board): Promise<void>;

  delete(id: string): Promise<void>;
}
