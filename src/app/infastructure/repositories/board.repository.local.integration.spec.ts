import {IndexedDbService} from '../indexed-db.service';
import {v4 as uuidv4} from 'uuid';
import {BoardRepositoryLocal} from './board.repository.local';
import {Board} from '../../core/entities/board';

describe('BoardRepositoryLocal', () => {
  let repo: BoardRepositoryLocal;
  let service: IndexedDbService;

  const createBoard = (): Board => {
    return {
      id: uuidv4(),
      title: 'title'
    };
  };

  beforeEach(async () => {
    service = new IndexedDbService();
    const db = await service.db;
    const tx = db.transaction('boards', 'readwrite');
    await tx.objectStore('boards').clear();
    await tx.done;

    repo = new BoardRepositoryLocal(service);
  });

  it('should add and retrieve a board by ID', async () => {
    const board = createBoard();
    const id = await repo.add(board);

    const result = await repo.getById(id);
    expect(result).toEqual(board);
  });

  it('should update an existing board', async () => {
    const board = createBoard();
    const id = await repo.add(board);

    const updated = {...board, title: 'updated title'};
    await repo.update(updated);

    const result = await repo.getById(id);
    expect(result?.title).toBe('updated title');
  });

  it('should delete a board', async () => {
    const board = createBoard();
    const id = await repo.add(board);
    await repo.delete(id);

    const result = await repo.getById(id);
    expect(result).toBeUndefined();
  });

  it('should paginate correctly', async () => {
    Array.from({length: 10}, async (_) => {
      const board = createBoard()
      await repo.add(board);
    });

    const allItems = await repo.getAll({offset: 0, limit: 10},);

    const page = await repo.getAll({offset: 4, limit: 4});
    expect(page.items.length).toBe(4);
    expect(page.items[0].id).toBe(allItems.items[4].id);
    expect(page.items[3].id).toBe(allItems.items[7].id);
  });

})
