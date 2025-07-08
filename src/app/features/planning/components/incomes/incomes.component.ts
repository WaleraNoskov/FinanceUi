import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';
import {Income} from '../../../../core/entities/income';
import {PeriodColumn} from '../../../../core/contracts/period-column';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-incomes',
  imports: [
    MatButton,
    MatIcon,
    MatList,
    MatListItem,
    MatListItemTitle,
    MatListItemLine,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.scss',
})
export class IncomesComponent {
  selectedIncome?: Income;
  private longPressTimeout: any;

  @Input() column?: PeriodColumn;
  @Output() add = new EventEmitter();
  @Output() update = new EventEmitter<Income>();
  @Output() delete = new EventEmitter<Income>();

  @ViewChild(MatMenuTrigger, {static: true}) menuTrigger!: MatMenuTrigger;

  onPressStart(event: MouseEvent | TouchEvent, item: Income) {
    event.preventDefault(); // предотвращает выделение текста

    this.selectedIncome = item;
    this.longPressTimeout = setTimeout(() => {
      this.menuTrigger.openMenu();
    }, 1000); // 500 мс — длительность долгого нажатия
  }

  onPressEnd() {
    clearTimeout(this.longPressTimeout);
  }
}
