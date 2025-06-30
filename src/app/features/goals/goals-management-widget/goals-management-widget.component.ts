import {Component, computed, effect} from "@angular/core";
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {EditableGoalsList} from '../editable-goals-list/editable-goals-list';
import {GoalStore} from '../goals-store';
import {AddOrEditGoalDialogService} from '../add-or-edit-goal-dialog-service';
import {Goal} from '../../../core/entities/goal';
import {BoardStore} from '../../boards/board-store';


@Component({
  standalone: true,
  selector: 'app-goals-management-widget',
  imports: [CommonModule, MatIcon, MatFabButton, EditableGoalsList, MatPaginator],
  template: `
    <div class="goal-container">
      <div>
        <button class="fab-button" matFab (click)="openAddDialog()">
          <mat-icon>add</mat-icon>
        </button>

        <app-editable-goals-list [goalList]="store.getGoals()" (deleted)="delete($event)"
                                 (needToUpdate)="onUpdateEmitted($event)"/>
      </div>
    </div>

    <mat-paginator
      [pageSize]="pageSize()"
      [pageIndex]="pageIndex()"
      [length]="store.getTotalCount()"
      [pageSizeOptions]="[5, 10, 20]"
      (page)="onPageChange($event)">
    </mat-paginator>
  `,
  styleUrl: './goals-management-widget.component.scss'
})

export class GoalsManagementWidget {
  pageIndex = computed(() => this.store.getCurrentPagination().offset / this.store.getCurrentPagination().limit);
  pageSize = computed(() => this.store.getCurrentPagination().limit);

  constructor(
    public readonly store: GoalStore,
    private readonly boardStore: BoardStore,
    private readonly addOrEditGoalDialogService: AddOrEditGoalDialogService
  ) {
    this.registerEffects()
  }

  private registerEffects() {
    effect(() => this.store.loadGoals());
  }

  async onPageChange(event: PageEvent) {
    const offset = event.pageIndex * event.pageSize;
    await this.store.loadGoals(offset, event.pageSize);
  }

  async openAddDialog() {
    this.addOrEditGoalDialogService.open().subscribe(async goal => {
      if(goal) {
        await this.store.addGoal(goal);
      }
    })
  }

  async onUpdateEmitted(goal: Goal) {
    this.addOrEditGoalDialogService.open(goal).subscribe(async goal => {
      if (goal)
        await this.store.updateGoal(goal);
    });
  }

  async delete(goal: Goal) {
    await this.store.deleteGoal(goal.id);
  }
}
