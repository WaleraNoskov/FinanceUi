import { PaginationParams } from '../../core/contracts/pagination-params';
import { PaginationResult } from '../../core/contracts/pagination-result';
import { Board } from '../../core/entities/board';
import {IBoardService} from '../../core/services/board.service';

export class BoardService implements IBoardService {
    getBoards(pagination: PaginationParams): Promise<PaginationResult<Board>> {
        throw new Error('Method not implemented.');
    }
    getById(id: string): Promise<Board | undefined> {
        throw new Error('Method not implemented.');
    }
    create(goal: Board): Promise<string> {
        throw new Error('Method not implemented.');
    }
    update(goal: Board): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
