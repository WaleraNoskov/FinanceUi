import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-delete-board-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatDialogTitle,
    MatInput,
    MatButton
  ],
  template: `
    <h2 mat-dialog-title>Delete Board</h2>

    <form [formGroup]="form" (ngSubmit)="onConfirm()" class="delete-form">
      <mat-dialog-content>
        <p>To delete the board, type its name <strong>{{ data.boardName }}</strong> below:</p>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Board Name</mat-label>
          <input matInput formControlName="confirmation" autocomplete="off"/>
          @if (this.form.controls['confirmation'].hasError('required')) {
            <mat-error>
              Name is required
            </mat-error>
          }
          @if (this.form.controls['confirmation'].hasError('mismatch')) {
            <mat-error>
              Name does not match
            </mat-error>
          }
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button matButton="filled" color="warn" type="submit" [disabled]="form.invalid">Delete</button>
        <button matButton="outlined" type="button" (click)="onCancel()">Cancel</button>
      </mat-dialog-actions>
    </form>
  `,
  styles: `
    form{
      display: flex; flex-direction: column;
    }

    mat-form-field {
      width: 100%;
    }
  `
})
export class DeleteBoardDialog implements OnInit {
  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { boardName: string },
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      confirmation: ['', [
        Validators.required,
        (control: AbstractControl) => control.value === this.data.boardName ? null : {mismatch: true}
      ]]
    });
  }

  onCancel() {
    this.cancelled.emit();
  }

  onConfirm() {
    if (this.form.valid) {
      this.saved.emit(this.form.value.confirmation);
    }
  }

  @Output() saved = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<void>();
}
