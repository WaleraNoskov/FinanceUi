import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
  templateUrl: './delete-board-dialog.html',
  styleUrl: './delete-board-dialog.scss'
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
