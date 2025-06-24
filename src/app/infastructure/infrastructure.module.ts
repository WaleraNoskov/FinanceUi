import {LocalGoalRepository} from './repositories/goal.repository.local';
import {GOAL_REPOSITORY} from '../core/repositories/repositories.injection-tokens';

export function provideInfrastructureServices() {
  return {provide: GOAL_REPOSITORY, useClass: LocalGoalRepository}
}
