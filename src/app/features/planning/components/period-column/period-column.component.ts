import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PeriodColumn} from '../../../../core/contracts/period-column';
import {IncomesComponent} from '../incomes/incomes.component';
import {Income} from '../../../../core/entities/income';

@Component({
  selector: 'app-period-column',
  imports: [
    IncomesComponent
  ],
  template: `
    <div class="column">
      <app-incomes [column]="column"
                   (add)="addIncome.emit()"
                   (edit)="editIncome.emit($event)"
                   (delete)="deleteIncome.emit($event)"/>
    </div>
  `,
  styles: ``
})
export class PeriodColumnComponent {
  @Input() column?: PeriodColumn;

  @Output() addIncome = new EventEmitter<void>();
  @Output() editIncome = new EventEmitter<Income>();
  @Output() deleteIncome = new EventEmitter<Income>();
}
