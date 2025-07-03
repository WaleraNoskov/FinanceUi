import {InjectionToken} from '@angular/core';
import {IGoalService} from './goal.service';
import {IBoardService} from './board.service';
import {IIncomeService} from './income.service';

export const GOAL_SERVICE = new InjectionToken<IGoalService>('GOAL_SERVICE');
export const BOARD_SERVICE = new InjectionToken<IBoardService>('BOARD_SERVICE');
export const INCOME_SERVICE = new InjectionToken<IIncomeService>('INCOME_SERVICE');
