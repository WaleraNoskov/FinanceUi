import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {DeleteBoardDialog} from '../components/delete-board-dialog/delete-board-dialog';

@Injectable({ providedIn: 'root' })
export class DeleteBoardDialogService {
  constructor(private dialog: MatDialog) {}

  openDeleteDialog(boardName: string): Observable<string | undefined> {
    const ref = this.dialog.open(DeleteBoardDialog, {
      data: { boardName },
    });

    const instance = ref.componentInstance;

    return new Observable(observer => {
      const savedSub = instance.saved.subscribe(name => {
        ref.close();
        observer.next(name);
        observer.complete();
      });

      const cancelSub = instance.cancelled.subscribe(() => {
        ref.close();
        observer.next(undefined);
        observer.complete();
      });

      ref.afterClosed().subscribe(() => {
        savedSub.unsubscribe();
        cancelSub.unsubscribe();
        observer.complete();
      });
    });
  }
}
