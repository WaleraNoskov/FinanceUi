import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Board} from '../../../core/entities/board';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';

@Component({
  selector: 'app-add-or-edit-board-from',
  imports: [
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  template: `
    <div class="form-container">
      <form [formGroup]="form" (ngSubmit)="submit()" class="form">
        <mat-form-field>
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required>
          @if (form.get('title')?.hasError('required')) {
            <mat-error>
              Title cannot be empty
            </mat-error>
          }
        </mat-form-field>
      </form>
    </div>
  `,
  styles: `
    .form-container {
      padding: 16px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .buttons-footer {
      display: flex;
      flex-direction: row;
      align-self: end;
      gap: 8px;
    }`
})
export class AddOrEditBoardForm {
  @Input() board: Board | null = null;
  @Output() saved = new EventEmitter<Board>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup = new FormGroup<>({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.board?.title ?? '', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.board) {
      this.form.patchValue(this.board);
    }
  }

  submit() {
    if (this.form.valid) {
      this.saved.emit({ ...this.board, ...this.form.value });
    }
  }

  cancel() {
    this.cancelled.emit();
  }
}
