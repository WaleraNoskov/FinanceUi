import { Routes } from '@angular/router';
import {BoardsManagementWidget} from './features/boards/widgets/boards-management-widget/boards-management-widget';
import {GoalsManagementWidget} from './features/goals/widgets/goals-management-widget/goals-management-widget.component';
import {SettingsPage} from './pages/settings/settings-page/settings-page';

export const routes: Routes = [
  {path: 'boards', component: BoardsManagementWidget},
  {path: 'goals', component: GoalsManagementWidget},
  {path: 'settings', component: SettingsPage}
];
