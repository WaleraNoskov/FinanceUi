import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Board} from '../../core/entities/board';
import {Observable, Subject} from 'rxjs';
import {AddOrEditBoardForm} from './add-or-edit-board-from/add-or-edit-board-form.component';

@Injectable({ providedIn: 'root' })
export class AddOrEditBoardDialogService {
  constructor(private dialog: MatDialog) {}

  open(board?: Board): Observable<Board | undefined> {
    const ref = this.dialog.open(AddOrEditBoardForm, {
      width: '500px',
      disableClose: true,
    });

    const instance = ref.componentInstance;
    instance.board = board ?? null;

    const result$ = new Subject<Board | undefined>();

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
