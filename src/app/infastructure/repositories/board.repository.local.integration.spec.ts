import {FinanceDb, IndexedDbService} from '../indexed-db.service';
import {v4 as uuidv4} from 'uuid';
import {BoardRepositoryLocal} from './board.repository.local';
import {Board} from '../../core/entities/board';
import {Goal} from '../../core/entities/goal';
import {IDBPDatabase} from 'idb';

describe('BoardRepositoryLocal', () => {
  let db: IDBPDatabase<FinanceDb>;
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
    db = await service.db;
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

  it('should delete board and related goals', async () => {

    const board: Board = {id: uuidv4(), title: 'Board 1'};
    let board1Id = await db.add('boards', board);

    const goal1: Goal = {
      id: uuidv4(),
      title: 'Goal 1',
      boardId: board1Id,
      currentAmount: 0,
      targetAmount: 0,
      deadline: new Date()
    };
    const goal2: Goal = {
      id: uuidv4(),
      title: 'Goal 2',
      boardId: board1Id,
      currentAmount: 0,
      targetAmount: 0,
      deadline: new Date()
    };
    const unrelatedGoal: Goal = {
      id: uuidv4(),
      title: 'Other',
      boardId: '',
      currentAmount: 0,
      targetAmount: 0,
      deadline: new Date()
    };

    let goal1Id = await db.add('goals', goal1);
    let goal2Id = await db.add('goals', goal2);
    let unrelatedGoalId = await db.add('goals', unrelatedGoal);

    await repo.delete(board1Id);

    const remainingBoard = await db.get('boards', board1Id);
    const remainingGoals = await db.getAll('goals')
      .then(goals => goals.filter(goal => goal.id === goal1Id || goal.id === goal2Id));

    expect(remainingBoard).toBeUndefined();
    expect(goal1Id)
    expect(remainingGoals.length).toBe(0);
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
