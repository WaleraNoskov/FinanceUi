import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PeriodColumn} from '../../../../core/contracts/period-column';
import {IncomesComponent} from '../incomes/incomes.component';
import {Income} from '../../../../core/entities/income';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';

@Component({
  selector: 'app-period-column',
  imports: [
    IncomesComponent,
    MatToolbar,
    MatToolbarRow
  ],
  template: `
    <mat-toolbar class="header">
      <mat-toolbar-row>
        <h1>{{ column!.date.toLocaleString('default', {month: 'long'}) }}</h1>
        <h2>{{ column!.date.toLocaleString('default', {month: '2-digit', day: '2-digit'}) }}</h2>
      </mat-toolbar-row>
    </mat-toolbar>

    <app-incomes [column]="column"
                 (add)="addIncome.emit()"
                 (edit)="updateIncome.emit($event)"
                 (delete)="deleteIncome.emit($event)"/>
  `,
  styles: `
    :host {
      padding: 16px 16px 0 16px;
      flex-grow: 1;
      scroll-snap-align: start;
    }

    .header {
      padding: 16px;
      border-radius: 24px;
    }

    .header mat-toolbar mat-toolbar-row {
      display: flex;
    }

    mat-toolbar h1 {
      margin: 0;
      font-size: 36px;
      flex-grow: 1;
    }

    mat-toolbar h2{
      margin: 0;
      color: darkgray;
      font-size: 36px;
    }

    app-incomes {
      margin-top: 32px;
    }
  `
})
export class PeriodColumnComponent {
  @Input() column?: PeriodColumn;

  @Output() addIncome = new EventEmitter<void>();
  @Output() updateIncome = new EventEmitter<Income>();
  @Output() deleteIncome = new EventEmitter<Income>();
}
