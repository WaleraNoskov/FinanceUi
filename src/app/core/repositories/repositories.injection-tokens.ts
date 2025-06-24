import {InjectionToken} from '@angular/core';
import {IGoalRepository} from './goal.repository';

export const GOAL_REPOSITORY = new InjectionToken<IGoalRepository>('GOAL_REPOSITORY');
