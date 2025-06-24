import {Component, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoalStore} from './goals-store';

@Component({
  standalone: true,
  selector: 'app-goals',
  imports: [CommonModule],
  template: `
    <h2>Мои цели</h2>

    <button (click)="create()">add</button>

    <div *ngIf="store.isLoading()">Загрузка...</div>

    <ul>
      <li *ngFor="let goal of store.goalList()">
        {{ goal.title }} — {{ goal.currentAmount }} / {{ goal.targetAmount }}
        <button (click)="delete(goal.id)">Удалить</button>
      </li>
    </ul>
  `,
  styleUrl: './goals.scss'
})
export class Goals {
  constructor(public store: GoalStore) {
    effect(() => this.store.loadGoals());
  }

  create(){
    this.store.addGoal({id: '', title: 'title', currentAmount: 0, targetAmount: 12000, deadline: new Date()});
  }

  delete(id: string) {
    this.store.deleteGoal(id);
  }
}
