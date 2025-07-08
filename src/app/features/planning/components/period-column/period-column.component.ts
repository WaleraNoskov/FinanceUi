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
  templateUrl: './period-column.component.html',
  styleUrl: 'period-column.component.scss'
})
export class PeriodColumnComponent {
  @Input() column?: PeriodColumn;

  @Output() addIncome = new EventEmitter<void>();
  @Output() updateIncome = new EventEmitter<Income>();
  @Output() deleteIncome = new EventEmitter<Income>();
}
