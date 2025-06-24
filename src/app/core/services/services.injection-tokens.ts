import {InjectionToken} from '@angular/core';
import {IGoalService} from './goal.service';

export const GOAL_SERVICE = new InjectionToken<IGoalService>('GOAL_SERVICE');
