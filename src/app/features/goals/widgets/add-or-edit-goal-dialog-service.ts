import {MatDialog} from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {Goal} from '../../../core/entities/goal';
import {Observable, Subject} from 'rxjs';
import {AddOrEditGoalForm} from '../components/add-or-edit-goal-form/add-or-edit-goal-form';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Injectable({ providedIn: 'root' })
export class AddOrEditGoalDialogService {
  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
  ) {}

  open(goal?: Goal): Observable<Goal | undefined>{
    return this.openAsBottomSheet(goal);
  }

  openAsDialog(goal?: Goal): Observable<Goal | undefined> {
    const ref = this.dialog.open(AddOrEditGoalForm, {
      width: '500px',
      disableClose: true,
    });

    const instance = ref.componentInstance;
    instance.goal = goal ?? null;

    const result$ = new Subject<Goal | undefined>();

    instance.saved.subscribe(result => {
      ref.close();
      result$.next(result);
      result$.complete();
    });

    instance.cancel.subscribe(() => {
      ref.close();
      result$.next(undefined);
      result$.complete();
    });

    return result$.asObservable();
  }

  private openAsBottomSheet(goal?: Goal): Observable<Goal | undefined> {
    const ref = this.bottomSheet.open(AddOrEditGoalForm, {
      data: goal ?? null,
      disableClose: true,
    });

    const result$ = new Subject<Goal | undefined>();
    const instance = ref.instance;

    instance.goal = goal ?? null;

    instance.saved.subscribe((result: Goal) => {
      ref.dismiss();
      result$.next(result);
      result$.complete();
    });

    instance.cancel.subscribe(() => {
      ref.dismiss();
      result$.next(undefined);
      result$.complete();
    });

    return result$.asObservable();
  }
}
