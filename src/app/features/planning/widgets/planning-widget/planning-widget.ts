import {Component, effect} from '@angular/core';
import {PlanningStore} from '../../planning-store';
import {BoardStore} from '../../../boards/board-store';
import {Recurrence} from '../../../../core/contracts/recurrence';
import {PeriodColumnComponent} from '../../components/period-column/period-column.component';
import {Income} from "../../../../core/entities/income";
import {AddOrEditIncomeFormDialogService} from "../add-or-edit-income-dialog-service";

@Component({
  standalone: true,
  selector: 'app-planning-widget',
  imports: [
    PeriodColumnComponent
  ],
  template: `
    <div class="column-scroll-container">
      @for (column of planningStore.getColumns(); track column) {
        <app-period-column [column]="column"
                           (addIncome)="onAddIncome()"
                           (updateIncome)="onUpdateIncome($event)"
                           (deleteIncome)="onDeleteIncome($event)"/>
      }
    </div>
  `,
  styles: `
    .column-scroll-container {
      display: flex;
      flex-grow: 1;
      scroll-snap-align: start;
    }

    :host {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  `
})
export class PlanningWidget {
  constructor(
    readonly planningStore: PlanningStore,
    private readonly boardStore: BoardStore,
    private readonly addOrEditIncomeService: AddOrEditIncomeFormDialogService,
  ) {
    this.registerEffects();
  }

  registerEffects() {
    effect(async () => {
      const currentBoard = this.boardStore.getSelected();

      if (currentBoard == null)
        return;

      await this.planningStore.loadColumns(Recurrence.Monthly, new Date(), currentBoard!.id);
    });
  }

  async ngOnInit() {
    if (this.boardStore.getSelected() == null)
      return;

    await this.planningStore.loadColumns(Recurrence.Monthly, new Date(), this.boardStore.getSelected()!.id)
  }

  async onAddIncome(): Promise<void> {
    this.addOrEditIncomeService.open().subscribe(async income => {
      if (income) {
        income.boardId = this.boardStore.getSelected()!.id;
        await this.planningStore.createIncome(income);
      }
    });
  }

  async onUpdateIncome(income: Income): Promise<void> {
    this.addOrEditIncomeService.open(income).subscribe(async income => {
      if (income) {
        income.boardId = this.boardStore.getSelected()!.id;
        await this.planningStore.updateIncome(income);
      }
    });
  }

  async onDeleteIncome(income: Income): Promise<void> {
    await this.planningStore.deleteIncome(income);
  }
}
