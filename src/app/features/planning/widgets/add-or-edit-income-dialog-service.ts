import {Injectable} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Income} from '../../../core/entities/income';
import {AddOrEditIncomeForm} from '../components/add-or-edit-income-form/add-or-edit-income-form';
import {Observable, Subject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddOrEditIncomeFormDialogService {
  constructor(private bottomSheet: MatBottomSheet) {}

  open(income?: Partial<Income>): Observable<Income | undefined> {
    const ref = this.bottomSheet.open(AddOrEditIncomeForm, {
      data: income,
    });

    const result$ = new Subject<Income | undefined>();
    const instance = ref.instance;

    instance.submitted.subscribe((result: Income) => {
      ref.dismiss();
      result$.next(result);
      result$.complete();
    });

    instance.cancelled.subscribe(() => {
      ref.dismiss();
      result$.next(undefined);
      result$.complete();
    });

    return result$.asObservable();
  }
}
