import {TestBed} from '@angular/core/testing';
import {BOARD_REPOSITORY} from '../../core/repositories/repositories.injection-tokens';
import {PaginationResult} from '../../core/contracts/pagination-result';
import {BoardService} from './board.service.impl';
import {IBoardRepository} from '../../core/repositories/board.repository';
import {Board} from '../../core/entities/board';

describe('BoardService', () => {
  let service: BoardService;
  let mockRepository: jasmine.SpyObj<IBoardRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj<IBoardRepository>('IBoardRepository', [
      'getAll', 'getById', 'add', 'update', 'delete'
    ]);

    TestBed.configureTestingModule({
      providers: [
        BoardService,
        {provide: BOARD_REPOSITORY, useValue: mockRepository}
      ]
    });

    service = TestBed.inject(BoardService);
  });

  it('should fetch boards with pagination', async () => {
    const mockBoards: PaginationResult<Board> = {
      total: 1,
      items: [{
        id: '1',
        title: 'Test'
      }]
    };
    mockRepository.getAll.and.resolveTo(mockBoards);

    const result = await service.getBoards({offset: 0, limit: 10});

    expect(mockRepository.getAll).toHaveBeenCalledWith({offset: 0, limit: 10});
    expect(result).toEqual(mockBoards);
  });

  it('should fetch board by id', async () => {
    const mockBoard: Board = {
      id: '1',
      title: 'Test'
    };
    mockRepository.getById.and.resolveTo(mockBoard);

    const result = await service.getById('1');

    expect(mockRepository.getById).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockBoard);
  });

  it('should create a board', async () => {
    const mockBoard: Board = {
      id: '2',
      title: 'New',
    };
    mockRepository.add.and.resolveTo();

    await service.create(mockBoard);

    expect(mockRepository.add).toHaveBeenCalledWith(mockBoard);
  });

  it('should update a board', async () => {
    const updateBoard: Board = {
      id: '3',
      title: 'Updated',
    };
    mockRepository.update.and.resolveTo();

    await service.update(updateBoard);

    expect(mockRepository.update).toHaveBeenCalledWith(updateBoard);
  });

  it('should delete a board', async () => {
    mockRepository.delete.and.resolveTo();

    await service.delete('4');

    expect(mockRepository.delete).toHaveBeenCalledWith('4');
  });
});
