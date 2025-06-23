import { LocalGoalRepository } from './goal.repository.local';
import { IndexedDbService } from '../indexed-db.service';
import { Goal } from '../../core/entities/goal';

describe('IndexedDbGoalRepository', () => {
  let repo: LocalGoalRepository;
  let service: IndexedDbService;

  const createGoal = (id: number): Goal => {
    return {
      id: id.toString(),
      title: `Goal ${id}`,
      targetAmount: 1000,
      currentAmount: 100 * id,
      deadline: new Date()
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
    const goal = createGoal(1);
    await repo.add(goal);

    const result = await repo.getById('1');
    expect(result).toEqual(goal);
  });

  it('should update an existing goal', async () => {
    const goal = createGoal(2);
    await repo.add(goal);

    const updated = { ...goal, currentAmount: 999 };
    await repo.update(updated);

    const result = await repo.getById('2');
    expect(result?.currentAmount).toBe(999);
  });

  it('should delete a goal', async () => {
    const goal = createGoal(3);
    await repo.add(goal);
    await repo.delete('3');

    const result = await repo.getById('3');
    expect(result).toBeUndefined();
  });

  it('should paginate correctly', async () => {
    const allGoals = Array.from({ length: 10 }, (_, i) => createGoal(i + 1));
    for (const g of allGoals) await repo.add(g);

    const page = await repo.getAll(4, 4); // ожидаем 4 цели начиная с 4-й
    expect(page.length).toBe(4);
    expect(page[0].id).toBe('4');
    expect(page[3].id).toBe('7');
  });
});
