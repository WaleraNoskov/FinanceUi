import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoardList } from './select-board-list';

describe('SelectBoardList', () => {
  let component: SelectBoardList;
  let fixture: ComponentFixture<SelectBoardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBoardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBoardList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
