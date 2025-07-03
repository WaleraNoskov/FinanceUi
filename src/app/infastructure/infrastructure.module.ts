import {GoalRepositoryLocal} from './repositories/goal.repository.local';
import {BOARD_REPOSITORY, GOAL_REPOSITORY, INCOME_REPOSITORY} from '../core/repositories/repositories.injection-tokens';
import {BoardRepositoryLocal} from './repositories/board.repository.local';
import {IncomeRepositoryLocal} from './repositories/income.repository.local';

export function provideInfrastructureServices() {
  return [
    {provide: GOAL_REPOSITORY, useClass: GoalRepositoryLocal},
    {provide: BOARD_REPOSITORY, useClass: BoardRepositoryLocal},
    {provide: INCOME_REPOSITORY, useClass: IncomeRepositoryLocal}
  ]
}
