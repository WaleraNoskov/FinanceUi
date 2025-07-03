import { Routes } from '@angular/router';
import {SettingsPage} from './pages/settings/settings-page/settings-page';
import {GoalsPage} from './pages/Goals/goals-page/goals-page';
import {PlanningPage} from './pages/planning/planning-page/planning-page';

export const routes: Routes = [
  {path: 'goals', component: GoalsPage},
  {path: 'settings', component: SettingsPage},
  {path: 'planning', component: PlanningPage},
];
