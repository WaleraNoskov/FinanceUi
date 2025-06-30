import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Goal} from '../../../core/entities/goal';
import {MatError, MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter
} from '@angular/material/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-add-or-edit-goal-form',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButton,
    MatLabel,
    MatError
  ],
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS},
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

        <mat-form-field >
          <mat-label>Amount</mat-label>
          <input matInput type="number" formControlName="targetAmount" required>
          @if (form.get('targetAmount')?.hasError('min')) {
            <mat-error>
              Amount should be greater than 0
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field >
          <mat-label>Deadline date</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="deadline">
          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <div class="buttons-footer">
          <button matButton="filled" type="submit" [disabled]="form.invalid">
            Save
          </button>
          <button matButton="tonal" (click)="cancel()">
            Cancel
          </button>
        </div>
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
    }
  `
})
export class AddOrEditGoalForm {
  @Input() goal: Goal | null = null;
  @Output() saved = new EventEmitter<Goal>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.goal?.title ?? '', Validators.required],
      currentAmount: 0,
      targetAmount: [this.goal?.targetAmount ?? 0, [Validators.required, Validators.min(0)]],
      deadline: [this.goal?.deadline ?? new Date()],
    });
  }

  ngOnChanges() {
    if (this.goal) {
      this.form.patchValue(this.goal);
    }
  }

  submit() {
    if (this.form.valid) {
      this.saved.emit({ ...this.goal, ...this.form.value });
    }
  }

  cancel() {
    this.cancelled.emit();
  }
}
