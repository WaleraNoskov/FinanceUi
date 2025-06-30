import { Routes } from '@angular/router';
import {BoardsManagementWidget} from './features/boards/boards-management-widget/boards-management-widget';
import {GoalsManagementWidget} from './features/goals/goals-management-widget/goals-management-widget.component';

export const routes: Routes = [
  {path: 'boards', component: BoardsManagementWidget},
  {path: 'goals', component: GoalsManagementWidget},
];
