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
  template: `
    <div class="header">
      <h3>Incomes</h3>
      <button matButton="outlined" (click)="add.emit()">
        <mat-icon>add</mat-icon>
        <span>Add</span>
      </button>
    </div>

    <div class="content">
      <mat-list>
        @if (column) {
          @for (income of column.incomes; track income.id) {
            <mat-list-item
              [matMenuTriggerFor]="contextMenu"
              #menuTrigger
              (mousedown)="onPressStart($event, income)"
              (mouseup)="onPressEnd()"
              (mouseleave)="onPressEnd()"
              (touchstart)="onPressStart($event, income)"
              (touchend)="onPressEnd()">
              <span matListItemTitle>{{ income.amount }}</span>
              <span matListItemLine>{{ income.name }}</span>
            </mat-list-item>
          }

          <mat-list-item>
            <span matListItemTitle class="total-title">Total income: {{ column.totalIncome }}</span>
          </mat-list-item>

          <mat-menu #contextMenu="matMenu">
            <button mat-menu-item (click)="edit.emit(selectedIncome)">
              <mat-icon>edit</mat-icon>
              <span>Edit</span>
            </button>
            <button mat-menu-item (click)="delete.emit(selectedIncome)">
              <mat-icon>delete</mat-icon>
              <span>Delete</span>
            </button>
          </mat-menu>
        }
      </mat-list>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
    }

    .header {
      padding: 0 16px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
    }

    .header h3{
      margin: 0;
      font-size: 36px;
      align-self: center;
      font-weight: 450;
    }

    .total-title {
    }
  `
})
export class IncomesComponent {
  selectedIncome?: Income;
  private longPressTimeout: any;

  @Input() column?: PeriodColumn;
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter<Income>();
  @Output() delete = new EventEmitter<Income>();

  @ViewChild(MatMenuTrigger, {static: true}) menuTrigger!: MatMenuTrigger;

  onPressStart(event: MouseEvent | TouchEvent, item: any) {
    event.preventDefault(); // предотвращает выделение текста

    this.longPressTimeout = setTimeout(() => {
      this.selectedIncome = item;
      this.menuTrigger.openMenu();
    }, 1000); // 500 мс — длительность долгого нажатия
  }

  onPressEnd() {
    clearTimeout(this.longPressTimeout);
  }
}
