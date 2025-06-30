import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditBoardForm } from './add-or-edit-board-form.component';

describe('AddOrEditBoardFrom', () => {
  let component: AddOrEditBoardForm;
  let fixture: ComponentFixture<AddOrEditBoardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditBoardForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditBoardForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
