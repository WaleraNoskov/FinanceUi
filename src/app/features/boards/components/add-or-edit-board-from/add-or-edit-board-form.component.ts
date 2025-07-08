import {Component, EventEmitter, OnInit} from '@angular/core';
import {Board} from '../../../../core/entities/board';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-add-or-edit-board-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-or-edit-board-form.html',
  styleUrl: './add-or-edit-board-form.scss',
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
    public board: Board | null,
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
