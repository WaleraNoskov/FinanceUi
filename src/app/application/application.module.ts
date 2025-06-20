import { NgModule, InjectionToken } from '@angular/core';
import {IGoalService} from '../core/services/goal.service';
import {GoalService} from './services/goal.service.impl';

export const GOAL_SERVICE = new InjectionToken<IGoalService>('GOAL_SERVICE');

@NgModule({
  providers: [
    { provide: GOAL_SERVICE, useClass: GoalService }
  ]
})
export class InfrastructureModule {}
