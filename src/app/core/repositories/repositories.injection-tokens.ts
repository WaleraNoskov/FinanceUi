import {InjectionToken} from '@angular/core';
import {IGoalRepository} from './goal.repository';
import {IBoardRepository} from './board.repository';
import {IIncomeRepository} from './IncomeRepository';

export const GOAL_REPOSITORY = new InjectionToken<IGoalRepository>('GOAL_REPOSITORY');
export const BOARD_REPOSITORY = new InjectionToken<IBoardRepository>('BOARD_REPOSITORY');
export const INCOME_REPOSITORY = new InjectionToken<IIncomeRepository>('INCOME_REPOSITORY');
