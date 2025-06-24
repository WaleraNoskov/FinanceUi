import {GOAL_SERVICE} from '../core/services/services.injection-tokens';
import {GoalService} from './services/goal.service.impl';

export function provideApplicationServices() {
  return {provide: GOAL_SERVICE, useClass: GoalService}
}
