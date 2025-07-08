import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {Income} from '../../../../core/entities/income';
import {Recurrence} from '../../../../core/contracts/recurrence';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import {CommonModule} from '@angular/common';

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
    CommonModule,
    MatSuffix,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-or-edit-income-form.html',
  styleUrl: './add-or-edit-income-form.scss',
})
export class AddOrEditIncomeForm {
  @Output() submitted = new EventEmitter<Income>();
  @Output() cancelled = new EventEmitter<void>();

  form!: IncomeFormType;

  readonly recurrenceOptions = Object.values(Recurrence);

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public income: Income | null,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl('', {nonNullable: true}),
      name: new FormControl('', {nonNullable: true}),
      amount: new FormControl(0, {nonNullable: true}),
      date: new FormControl(new Date(), {nonNullable: true}),
      recurrence: new FormControl<Recurrence>(Recurrence.Once, {nonNullable: true}),
      interval: new FormControl<number | null>(null),
      endDate: new FormControl<Date | null>(null),
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

type IncomeFormType = FormGroup<{
  id: FormControl<string>;
  name: FormControl<string>;
  amount: FormControl<number>;
  date: FormControl<Date>;
  recurrence: FormControl<Recurrence>;
  interval: FormControl<number | null>;
  endDate: FormControl<Date | null>;
}>;
