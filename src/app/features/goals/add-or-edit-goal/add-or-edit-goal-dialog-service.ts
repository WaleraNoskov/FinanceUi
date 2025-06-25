import {MatDialog} from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {Goal} from '../../../core/entities/goal';
import {Observable, Subject} from 'rxjs';
import {AddOrEditGoal} from './add-or-edit-goal';

@Injectable({ providedIn: 'root' })
export class AddOrEditGoalDialogService {
  constructor(private dialog: MatDialog) {}

  open(goal?: Goal): Observable<Goal | undefined> {
    const ref = this.dialog.open(AddOrEditGoal, {
      width: '500px',
      disableClose: true,
    });

    const instance = ref.componentInstance;
    instance.goal = goal ?? null;

    console.log(instance.goal);

    const result$ = new Subject<Goal | undefined>();

    instance.saved.subscribe(result => {
      ref.close();
      result$.next(result);
      result$.complete();
    });

    instance.cancelled.subscribe(() => {
      ref.close();
      result$.next(undefined);
      result$.complete();
    });

    return result$.asObservable();
  }
}
