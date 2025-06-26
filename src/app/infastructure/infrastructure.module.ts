import {LocalGoalRepository} from './repositories/goal.repository.local';
import {GOAL_REPOSITORY} from '../core/repositories/repositories.injection-tokens';

export function provideInfrastructureServices() {
  console.log('aboba')
  return {provide: GOAL_REPOSITORY, useClass: LocalGoalRepository}
}
