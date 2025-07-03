import {Component, effect, EventEmitter, Output} from '@angular/core';
import {PlanningStore} from '../../planning-store';
import {BoardStore} from '../../../boards/board-store';
import {Recurrence} from '../../../../core/contracts/recurrence';
import {PeriodColumnComponent} from '../../components/period-column/period-column.component';

@Component({
  standalone: true,
  selector: 'app-planning-widget',
  imports: [
    PeriodColumnComponent
  ],
  template: `
    <div class="column-scroll-container">
      @for (column of planningStore.getColumns(); track column) {
        <app-period-column [column]="column"/>
      }
    </div>
  `,
  styles: `
    .column-scroll-container {
      flex-grow: 1;
      scroll-snap-align: start;
      width: 300px;
      margin-right: 8px;
    }

    .column-scroll-container app-period-column {
      flex-grow: 1;
      scroll-snap-align: start;
      width: 300px;
      margin-right: 8px;
    }
  `
})
export class PlanningWidget {
  @Output() columnCountChanged = new EventEmitter<number>();

  constructor(
    readonly planningStore: PlanningStore,
    private readonly boardStore: BoardStore,
  ) {
    this.registerEffects();
  }

  registerEffects(){
    effect(async () => {
      const currentBoard = this.boardStore.getSelected();

      if(currentBoard == null)
        return;

      await this.planningStore.loadColumns(Recurrence.Monthly, new Date(), currentBoard!.id);
      this.columnCountChanged.emit(this.planningStore.getColumns.length);
    });
  }

  async ngOnInit() {
    if(this.boardStore.getSelected() == null)
      return;

    await this.planningStore.loadColumns(Recurrence.Monthly, new Date(), this.boardStore.getSelected()!.id )
    this.columnCountChanged.emit(this.planningStore.getColumns.length);
  }
}
