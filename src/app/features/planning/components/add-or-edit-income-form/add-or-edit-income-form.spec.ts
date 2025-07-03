import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditIncomeForm } from './add-or-edit-income-form';

describe('AddOrEditIncomeForm', () => {
  let component: AddOrEditIncomeForm;
  let fixture: ComponentFixture<AddOrEditIncomeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditIncomeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditIncomeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
