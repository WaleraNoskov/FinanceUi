import { Routes } from '@angular/router';
import {BoardsManagementWidget} from './features/boards/widgets/boards-management-widget/boards-management-widget';
import {GoalsManagementWidget} from './features/goals/widgets/goals-management-widget/goals-management-widget.component';
import {SettingsPage} from './pages/settings/settings-page/settings-page';
import {GoalsPage} from './pages/Goals/goals-page/goals-page';

export const routes: Routes = [
  {path: 'goals', component: GoalsPage},
  {path: 'settings', component: SettingsPage}
];
