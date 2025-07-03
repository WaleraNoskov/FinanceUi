import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {AddOrEditIncomeFormDialogService} from '../../../features/planning/widgets/add-or-edit-income-dialog-service';
import {PlanningStore} from '../../../features/planning/planning-store';
import {BoardStore} from '../../../features/boards/board-store';
import {Recurrence} from '../../../core/contracts/recurrence';

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
    private readonly boardStore: BoardStore,
  ) {
  }

  onAddIncomeClick(): void {
    this.addOrEditIncomeFormDialogService.open().subscribe(async income =>{
      if(income)
      {
        income.boardId = this.boardStore.getSelected()!.id;
        await this.planningStore.createIncome(income);
        await this.planningStore.loadColumns(Recurrence.Monthly, new Date(), income.boardId);
      }
    });
  }
}
