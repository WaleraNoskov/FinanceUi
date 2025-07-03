import {Component, computed, signal} from '@angular/core';
import {PlanningWidget} from '../../../features/planning/widgets/planning-widget/planning-widget';
import {EmptyPlanningPageWidget} from '../empty-page-widget/empty-planning-page-widget.component';

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
        <app-planning-widget (columnCountChanged)="onColumnsCountChanged($event)"/>
      }
    </div>
  `,
  styles: `
    .container{
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

    .spacer{
    }

    app-planning-page {
      flex-grow: 1;
      display: flex;
    }
  `
})
export class PlanningPage {
  private columnsIsEmpty = signal<boolean>(true);
  public getColumnsIsEmpty = computed(() => this.columnsIsEmpty());

  public onColumnsCountChanged(count: number) {
    this.columnsIsEmpty.set(count == 0);
  }
}
