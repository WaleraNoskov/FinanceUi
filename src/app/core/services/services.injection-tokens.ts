import {InjectionToken} from '@angular/core';
import {IGoalService} from './goal.service';
import {IBoardService} from './board.service';

export const GOAL_SERVICE = new InjectionToken<IGoalService>('GOAL_SERVICE');
export const BOARD_SERVICE = new InjectionToken<IBoardService>('BOARD_SERVICE');
