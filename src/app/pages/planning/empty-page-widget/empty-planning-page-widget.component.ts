import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {AddOrEditIncomeFormDialogService} from '../../../features/planning/widgets/add-or-edit-income-dialog-service';
import {PlanningStore} from '../../../features/planning/planning-store';

@Component({
  selector: 'app-empty-planning-page-widget',
  imports: [
    MatButton
  ],
  template: `
    <div class="actions">
      <span>Add incomes or payments to start planning</span>

      <button matButton="outlined" (click)="onAddIncomeClick()">
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
  constructor(
    private readonly addOrEditIncomeFormDialogService: AddOrEditIncomeFormDialogService,
    private readonly planningStore: PlanningStore,
  ) {
  }

  onAddIncomeClick(): void {
    this.addOrEditIncomeFormDialogService.open().subscribe(async income =>{
      if(income)
        await this.planningStore.createIncome(income);
    });
  }
}
