import {Component, computed, effect, signal, WritableSignal} from '@angular/core';
import {PlanningWidget} from '../../../features/planning/widgets/planning-widget/planning-widget';
import {EmptyPlanningPageWidget} from '../empty-page-widget/empty-planning-page-widget.component';
import {PlanningStore} from '../../../features/planning/planning-store';
import {Recurrence} from '../../../core/contracts/recurrence';
import {BoardStore} from '../../../features/boards/board-store';

@Component({
  selector: 'app-planning-page',
  imports: [
    PlanningWidget,
    EmptyPlanningPageWidget
  ],
  template: `
    <div class="container">
      @if (getColumnsIsEmpty()) {
        <div class="empty-page-container">
          <div class="spacer"></div>
          <app-empty-planning-page-widget/>
          <div></div>
        </div>
      } @else {
        <app-planning-widget/>
      }
    </div>
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height: 100%;
    }

    .empty-page-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      align-items: center;
    }

    .spacer {
    }

    app-planning-page {
      flex-grow: 1;
      display: flex;
    }
  `
})
export class PlanningPage {
  private columnsIsEmpty: WritableSignal<boolean> = signal<boolean>(true);
  public readonly getColumnsIsEmpty = computed(() => this.columnsIsEmpty());

  constructor(
    private readonly planningStore: PlanningStore,
    private readonly boardStore: BoardStore
  ) {
     this.registerEffects();
  }

  private registerEffects(): void {
    effect(() => {
      console.log('set empty')
      
      const columns = this.planningStore.getColumns();
      this.columnsIsEmpty.set(columns.length == 0);
    });
    effect(async () => {
      console.log('load columns')

      const board = this.boardStore.getSelected();

      if(board)
        await this.planningStore.loadColumns(Recurrence.Monthly, new Date(), board.id)
    });
  }
}
