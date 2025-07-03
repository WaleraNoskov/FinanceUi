import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-empty-planning-page-widget',
  imports: [
    MatButton
  ],
  template: `
    <div class="actions">
      <span>Add incomes or payments to start planning</span>

      <button matButton="outlined">
        Add income
      </button>
      <button matButton="outlined">
        Add payment
      </button>
    </div>
  `,
  styles: `
    .actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .actions span{
      padding: 0 0 16px 0;
    }
  `
})
export class EmptyPlanningPageWidget {

}
