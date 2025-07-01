import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableGoalsList } from './editable-goals-list';

describe('GoalsList', () => {
  let component: EditableGoalsList;
  let fixture: ComponentFixture<EditableGoalsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableGoalsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableGoalsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
