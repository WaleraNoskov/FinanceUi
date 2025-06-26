import {BOARD_SERVICE, GOAL_SERVICE} from '../core/services/services.injection-tokens';
import {GoalService} from './services/goal.service.impl';
import {BoardService} from './services/board.service.impl';


export function provideApplicationServices() {
  return [
    {provide: GOAL_SERVICE, useClass: GoalService},
    {provide: BOARD_SERVICE, useClass: BoardService}
  ]
}
