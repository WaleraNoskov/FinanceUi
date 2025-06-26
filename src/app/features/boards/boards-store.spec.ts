import {BoardStore} from './board-store.service';
import {IBoardService} from '../../core/services/board.service';
import {Board} from '../../core/entities/board';

describe('BoardsStore', () => {
  let store: BoardStore;
  let mockService: jasmine.SpyObj<IBoardService>;
  beforeEach(() => {
    mockService = jasmine.createSpyObj('BoardService', ['getBoards', 'create', 'update', 'delete']);

    mockService.getBoards.and.resolveTo({ items: [], total: 0 });

    // получаем через DI
    store = new BoardStore(mockService);
  });

  it('should load boards and update state', async () => {
    const boards: Board[] = [
      { id: '1', title: 'Test'}
    ];

    mockService.getBoards.and.resolveTo({ items: boards, total: 1 });

    await store.loadBoards();

    expect(store.boardList()).toEqual(boards);
    expect(store.totalBoardsCount()).toBe(1);
  });

  it('should add board and refresh list', async () => {
    const boards: Board[] = [
      { id: '1', title: 'Test'}
    ];

    mockService.create.and.resolveTo('3');
    mockService.getBoards.and.resolveTo({ items: boards, total: 2 });

    await store.addBoard(boards[0]);

    expect(mockService.create).toHaveBeenCalled();
    expect(mockService.getBoards).toHaveBeenCalled();
  });

  it('should update board and refresh list', async () => {
    const boards: Board[] = [
      { id: '1', title: 'Test' }
    ];

    mockService.update.and.resolveTo();
    mockService.getBoards.and.resolveTo({ items: boards, total: 2 });

    await store.updateBoard(boards[0]);

    expect(mockService.update).toHaveBeenCalledWith(boards[0]);
    expect(mockService.getBoards).toHaveBeenCalled();
  });

  it('should delete board and refresh list', async () => {
    const boards: Board[] = [
      { id: '1', title: 'Test'}
    ];

    mockService.delete.and.resolveTo();
    mockService.getBoards.and.resolveTo({ items: boards, total: 2 });

    await store.deleteBoard('1');

    expect(mockService.delete).toHaveBeenCalledWith('1');
    expect(mockService.getBoards).toHaveBeenCalled();
  });

  it('should refresh using stored pagination', async () => {
    const boards: Board[] = [
      { id: '1', title: 'Test' }
    ];

    mockService.getBoards.and.resolveTo({ items: boards, total: 2 });

    await store.loadBoards(5, 10);
    await store.refresh();

    expect(mockService.getBoards).toHaveBeenCalledWith({ offset: 5, limit: 10 });
  });
});
