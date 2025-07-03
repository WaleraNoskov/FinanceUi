import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Income} from '../../../../core/entities/income';
import {Recurrence} from '../../../../core/contracts/recurrence';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  standalone: true,
  selector: 'app-add-or-edit-income-form',
  imports: [
    ReactiveFormsModule,
    MatSelect,
    MatLabel,
    MatFormField,
    MatOption,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="form">
      <h3>{{ form.value.id ? 'Edit' : 'Create' }} income</h3>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name"/>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Amount</mat-label>
        <input matInput type="number" formControlName="amount"/>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Date</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="date"/>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Recurrence</mat-label>
        <mat-select formControlName="recurrence">
          @for (option of recurrenceOptions; track option) {
            <mat-option [value]="option">
              {{ option }}
            </mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Interval</mat-label>
        <input matInput type="number" formControlName="interval"/>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>End date</mat-label>
        <input matInput [matDatepicker]="endPicker" formControlName="endDate"/>
        <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
      </mat-form-field>

      <div class="actions">
        <button matButton="filled" type="submit" [disabled]="form.invalid">
          {{ form.value.id ? 'Save' : 'Create' }}
        </button>
        <button matButton="outlined" (click)="cancel()">Cancel</button>
      </div>
    </form>
  `,
  styles: `
    h3{font-weight: 450;}
    .form {  display: flex; flex-direction: column; }
    .actions { display: flex; justify-content: flex-end; gap: 8px; }
    .full-width { width: 100%; }`
})
export class AddOrEditIncomeForm {
  @Input() income?: Partial<Income>;
  @Output() submitted = new EventEmitter<Income>();
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;

  readonly recurrenceOptions = Object.values(Recurrence);

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      date: [new Date(), Validators.required],
      recurrence: [Recurrence.Once, Validators.required],
      interval: [0],
      endDate: [new Date()],
    });

    if (this.income) {
      this.form.patchValue(this.income);
    }
  }

  submit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.value as Income);
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
