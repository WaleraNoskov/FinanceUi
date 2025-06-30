import {PaginationParams} from '../contracts/pagination-params';
import {PaginationResult} from '../contracts/pagination-result';
import {Board} from '../entities/board';

export interface IBoardRepository{
  getAll(pagination: PaginationParams): Promise<PaginationResult<Board>>;
  getById(id: string): Promise<Board | undefined>;
  add(board: Board): Promise<string>;
  update(board: Board): Promise<void>;
  delete(id: string): Promise<void>;
  openAccess(): Promise<void>;
  closeAccess(): Promise<void>;
}
