import { NgModule } from '@angular/core';
import { LocalGoalRepository } from './repositories/goal.repository.local';
import {IndexedDbService} from './indexed-db.service';
import {GOAL_REPOSITORY} from './injection-tokens';

@NgModule({
  providers: [
    IndexedDbService,
    { provide: GOAL_REPOSITORY, useClass: LocalGoalRepository }
  ]
})
export class InfrastructureModule {}
