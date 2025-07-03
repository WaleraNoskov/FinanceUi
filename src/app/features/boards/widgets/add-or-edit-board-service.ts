import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Board} from '../../../core/entities/board';
import {Observable, Subject} from 'rxjs';
import {AddOrEditBoardForm} from '../components/add-or-edit-board-from/add-or-edit-board-form.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Injectable({ providedIn: 'root' })
export class AddOrEditBoardDialogService {
  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {}

  open(board?: Board): Observable<Board | undefined> {
    return this.openAsBottomSheet(board);
  }

  private openAsDialog(board?: Board): Observable<Board | undefined> {
    const ref = this.dialog.open(AddOrEditBoardForm, {
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

  private openAsBottomSheet(board?: Board): Observable<Board | undefined> {
    const ref = this.bottomSheet.open(AddOrEditBoardForm, {
      data: board ?? null,
      disableClose: true,
    });

    const result$ = new Subject<Board | undefined>();
    const instance = ref.instance;

    instance.saved.subscribe((result: Board) => {
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
