import { NgModule, InjectionToken } from '@angular/core';
import { IGoalRepository } from '../core/repositories/goal.repository';
import { LocalGoalRepository } from './repositories/goal.repository.local';
import {IndexedDbService} from './indexed-db.service';

export const GOAL_REPOSITORY = new InjectionToken<IGoalRepository>('GOAL_REPOSITORY');

@NgModule({
  providers: [
    IndexedDbService,
    { provide: GOAL_REPOSITORY, useClass: LocalGoalRepository }
  ]
})
export class InfrastructureModule {}
