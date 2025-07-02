import { Component } from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {
  GoalsManagementWidget
} from '../../../features/goals/widgets/goals-management-widget/goals-management-widget.component';

@Component({
  selector: 'app-goals-page',
  imports: [
    MatToolbar,
    MatToolbarRow,
    GoalsManagementWidget
  ],
  template: `
    <div class="goals-page">
      <div class="header-container">
        <mat-toolbar color="primary" class="header">
          <mat-toolbar-row>
            <h1 class="header-title">
              Goals
            </h1>
          </mat-toolbar-row>
          <mat-toolbar-row>
          <span class="header-subtitle">
            Review and edit your goals.
          </span>
          </mat-toolbar-row>
        </mat-toolbar>
      </div>

      <app-goals-management-widget/>
    </div>
  `,
  styles: `
    .goals-page {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .header-container {
      padding: 8px;
    }

    .header {
      border-radius: 24px;
      padding: 24px;
      gap: 8px;
    }

    .header-title {
      font-size: 48px;
    }

    .header-subtitle {
      font-size: 16px;
      text-wrap: auto;
    }

    app-goals-management-widget {
      display: flex;
      flex-grow: 1;
      overflow-y: auto;
      padding: 32px 24px 8px 24px;
    }`
})
export class GoalsPage {

}
