import {Component, computed, effect, Input} from "@angular/core";
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {EditableGoalsList} from '../../components/editable-goals-list/editable-goals-list';
import {GoalStore} from '../../goals-store';
import {AddOrEditGoalDialogService} from '../add-or-edit-goal-dialog-service';
import {Goal} from '../../../../core/entities/goal';
import {BoardStore} from '../../../boards/board-store';


@Component({
  standalone: true,
  selector: 'app-goals-management-widget',
  imports: [CommonModule, MatIcon, EditableGoalsList, MatPaginator, MatButton],
  template: `
    <div class="content-container">
      <div class="buttons-container">
        <button matButton="outlined" (click)="openAddDialog()">
          <mat-icon>add</mat-icon>
          <span>Add</span>
        </button>
      </div>

      <div class="goal-container">
          <app-editable-goals-list [goalList]="store.getGoals()" (deleted)="delete($event)"
                                   (needToUpdate)="onUpdateEmitted($event)"/>
      </div>

      <mat-paginator
        [pageSize]="pageSize()"
        [pageIndex]="pageIndex()"
        [length]="store.getTotalCount()"
        [pageSizeOptions]="[5, 10, 20]"
        [hidePageSize]="fixedPageSize != null"
        (page)="onPageChange($event)">
      </mat-paginator>
    </div>
  `,
  styles: `
    .buttons-container{
        align-self: end;
    }

    .goal-container {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: auto;
      flex-grow: 1;
      padding: 4px 0 0 0;
    }

    .content-container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow: clip;
    }
  `
})

export class GoalsManagementWidget {
  @Input() fixedPageSize?: number | null;

  pageIndex = computed(() => this.store.getPagination().offset / this.store.getPagination().limit);
  pageSize = computed(() => this.store.getPagination().limit);

  constructor(
    public readonly store: GoalStore,
    private readonly boardStore: BoardStore,
    private readonly addOrEditGoalDialogService: AddOrEditGoalDialogService
  ) {
    this.registerEffects()
  }

  private registerEffects() {
    effect(() => this.store.loadGoals());
    effect(async () => {
      const board = this.boardStore.getSelected();
      if(board){
        await this.store.loadGoals(0, this.fixedPageSize ?? 10,  board.id);
      }
    })
  }

  async onPageChange(event: PageEvent) {
    const offset = event.pageIndex * event.pageSize;
    await this.store.loadGoals(offset, event.pageSize);
  }

  async openAddDialog() {
    this.addOrEditGoalDialogService.open().subscribe(async goal => {
      if(goal) {
        goal.boardId = this.store.getCurrentBoardId() ?? '';
        await this.store.addGoal(goal);
      }
    })
  }

  async onUpdateEmitted(goal: Goal) {
    this.addOrEditGoalDialogService.open(goal).subscribe(async goal => {
      if (goal) {
        goal.boardId = this.store.getCurrentBoardId() ?? '';
        await this.store.updateGoal(goal);
      }
    });
  }

  async delete(goal: Goal) {
    await this.store.deleteGoal(goal.id);
  }
}
