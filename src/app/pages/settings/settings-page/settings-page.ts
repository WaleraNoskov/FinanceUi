import {Component, computed, signal} from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {SelectBoardWidget} from '../../../features/boards/widgets/select-board-widget/select-board-widget';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  BoardsManagementWidget
} from '../../../features/boards/widgets/boards-management-widget/boards-management-widget';

@Component({
  selector: 'app-settings-page',
  imports: [
    MatToolbar,
    MatToolbarRow,
    SelectBoardWidget,
    MatIcon,
    MatIconButton,
    BoardsManagementWidget,
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
      <div class="boards-header">
        <h2>Current Board</h2>
        @if (!getIsEditMode()) {
          <button matIconButton (click)="openEditMode()">
            <mat-icon>edit</mat-icon>
          </button>
        } @else {
          <button matIconButton (click)="closeEditMode()">
            <mat-icon>close</mat-icon>
          </button>
        }
      </div>

      @if (!getIsEditMode()) {
        <app-select-board-widget/>
      } @else {
          <app-boards-management-widget [fixedPageSize]="5"/>
      }
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

    .header-title {
      font-size: 48px;
    }

    .header-subtitle {
      font-size: 16px;
      text-wrap: auto;
    }

    .content-container {
      padding: 0 24px;
    }

    .boards-header {
      display: flex;
      flex-direction: row;
      margin: 32px 0 12px 0;
    }

    .boards-header > h2 {
      font-weight: 450;
      font-size: 32px;
      flex-grow: 1;
      margin: 0;
    }
  `
})

export class SettingsPage {
  private isEditMode = signal<boolean>(false);
  public getIsEditMode = computed(() => this.isEditMode());

  public openEditMode() {
    this.isEditMode.set(true);
  }

  public closeEditMode() {
    this.isEditMode.set(false);
  }
}
