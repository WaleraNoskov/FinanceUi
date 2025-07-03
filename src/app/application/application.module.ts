import {BOARD_SERVICE, GOAL_SERVICE, INCOME_SERVICE} from '../core/services/services.injection-tokens';
import {GoalService} from './services/goal.service.impl';
import {BoardService} from './services/board.service.impl';
import {IncomeService} from './services/income.service.impl';


export function provideApplicationServices() {
  return [
    {provide: GOAL_SERVICE, useClass: GoalService},
    {provide: BOARD_SERVICE, useClass: BoardService},
    {provide: INCOME_SERVICE, useClass: IncomeService},
  ]
}
