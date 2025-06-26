import {LocalGoalRepository} from './goal.repository.local';
import {IndexedDbService} from '../indexed-db.service';
import {Goal} from '../../core/entities/goal';
import {v4 as uuidv4} from 'uuid';

describe('IndexedDbGoalRepository', () => {
  let repo: LocalGoalRepository;
  let service: IndexedDbService;

  const createGoal = (boardId = 'defaultBoardId'): Goal => {
    return {
      id: uuidv4(),
      title: `Goal ${uuidv4()}`,
      targetAmount: 1000,
      currentAmount: 100,
      deadline: new Date(),
      boardId: boardId
    };
  };

  beforeEach(async () => {
    service = new IndexedDbService();
    const db = await service.db;
    const tx = db.transaction('goals', 'readwrite');
    await tx.objectStore('goals').clear();
    await tx.done;

    repo = new LocalGoalRepository(service);
  });

  it('should add and retrieve a goal by ID', async () => {
    const goal = createGoal();
    const id = await repo.add(goal);

    const result = await repo.getById(id);
    expect(result).toEqual(goal);
  });

  it('should update an existing goal', async () => {
    const goal = createGoal();
    const id = await repo.add(goal);

    const updated = {...goal, currentAmount: 999};
    await repo.update(updated);

    const result = await repo.getById(id);
    expect(result?.currentAmount).toBe(999);
  });

  it('should delete a goal', async () => {
    const goal = createGoal();
    const id = await repo.add(goal);
    await repo.delete(id);

    const result = await repo.getById(id);
    expect(result).toBeUndefined();
  });

  it('should paginate correctly', async () => {
    Array.from({length: 10}, async (_) => {
      const g = createGoal()
      await repo.add(g);
    });

    const allItems = await repo.getAll({offset: 0, limit: 10}, 'defaultBoardId');

    const page = await repo.getAll({offset: 4, limit: 4}, 'defaultBoardId');
    expect(page.items.length).toBe(4);
    expect(page.items[0].id).toBe(allItems.items[4].id);
    expect(page.items[3].id).toBe(allItems.items[7].id);
  });
});
