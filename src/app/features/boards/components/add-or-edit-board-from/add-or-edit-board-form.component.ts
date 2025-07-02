import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {Board} from '../../../../core/entities/board';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-or-edit-board-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    @if (form) {
      <form [formGroup]="form" (ngSubmit)="submit()" class="form">
        <h3>{{ isEditMode ? 'Edit board' : 'Create board' }}</h3>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Название</mat-label>
          <input matInput formControlName="title" required>
        </mat-form-field>

        <div class="actions">
          <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">
            {{ isEditMode ? 'Save' : 'Create' }}
          </button>
          <button mat-stroked-button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    }
  `,
  styles: [`
    h3{font-weight: 450;}
    .form {  display: flex; flex-direction: column; gap: 16px; }
    .actions { display: flex; justify-content: flex-end; gap: 8px; }
    .full-width { width: 100%; }
  `]
})

export class AddOrEditBoardForm implements OnInit {
  form!: FormGroup;

  saved = new EventEmitter<Board>();
  cancelled = new EventEmitter<void>();

  get isEditMode(): boolean {
    return !!this.board?.id;
  }

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public board: Board | null,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.board?.id || ''],
      title: [this.board?.title || '', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.saved.emit(this.form.value as Board);
    }
  }

  cancel() {
    this.cancelled.emit();
  }
}
