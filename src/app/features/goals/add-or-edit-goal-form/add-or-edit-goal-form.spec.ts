import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditGoalForm } from './add-or-edit-goal-form';

describe('AddOrEditGoal', () => {
  let component: AddOrEditGoalForm;
  let fixture: ComponentFixture<AddOrEditGoalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditGoalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditGoalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
