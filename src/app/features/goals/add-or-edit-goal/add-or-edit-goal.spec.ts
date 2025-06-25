import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditGoal } from './add-or-edit-goal';

describe('AddOrEditGoal', () => {
  let component: AddOrEditGoal;
  let fixture: ComponentFixture<AddOrEditGoal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditGoal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditGoal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
