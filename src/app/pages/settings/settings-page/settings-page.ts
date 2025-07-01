import { Component } from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatGridList} from '@angular/material/grid-list';
import {SelectBoardWidget} from '../../../features/boards/widgets/select-board-widget/select-board-widget';

@Component({
  selector: 'app-settings-page',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatGridList,
    SelectBoardWidget
  ],
  template: `
    <div class="header-container">
      <mat-toolbar color="primary" class="header">
        <mat-toolbar-row>
          <h1 class="header-title">
            Settings
          </h1>
        </mat-toolbar-row>
        <mat-toolbar-row>
          <span class="header-subtitle">
            Select board to edit and change account settings.
          </span>
        </mat-toolbar-row>
      </mat-toolbar>
    </div>

    <div class="content-container">
      <h2>Current Board</h2>
      <app-select-board-widget/>
    </div>
  `,
  styles: `
    .header-container {
      padding: 8px;
    }

    .header {
      border-radius: 24px;
      padding: 24px;
      gap: 8px;
    }

    .header-title{
      font-size: 48px;
    }

    .header-subtitle {
      font-size: 16px;
      text-wrap: auto;
    }

    .content-container{
      padding: 0 24px;
    }

    h2{
      font-weight: 450;
      font-size: 32px;
    }
  `
})
export class SettingsPage {
}
