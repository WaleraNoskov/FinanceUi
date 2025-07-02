import {Component, EventEmitter, Output, OnInit, Inject} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CommonModule} from '@angular/common';
import {Goal} from '../../../../core/entities/goal';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-add-or-edit-goal-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Title</mat-label>
        <input matInput formControlName="title" required/>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Target Amount</mat-label>
        <input matInput type="number" formControlName="targetAmount" required/>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Current Amount</mat-label>
        <input matInput type="number" formControlName="currentAmount"/>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Deadline</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="deadline" required/>
        <mat-datepicker-toggle matSuffix [for]="picker"/>
        <mat-datepicker #picker/>
      </mat-form-field>

      <div class="buttons">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Сохранить</button>
        <button mat-button type="button" (click)="cancel.emit()">Отмена</button>
      </div>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `]
})
export class AddOrEditGoalForm implements OnInit {
  form!: FormGroup;

  @Output() saved = new EventEmitter<Goal>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_BOTTOM_SHEET_DATA) public goal: Goal | null
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.goal?.title ?? '', Validators.required],
      targetAmount: [this.goal?.targetAmount ?? 0, [Validators.required, Validators.min(0)]],
      currentAmount: [this.goal?.currentAmount ?? 0, [Validators.min(0)]],
      deadline: [this.goal?.deadline ?? new Date, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;
      this.saved.emit({
        ...this.goal,
        ...value,
        deadline: new Date(value.deadline!)
      } as Goal);
    }
  }
}
