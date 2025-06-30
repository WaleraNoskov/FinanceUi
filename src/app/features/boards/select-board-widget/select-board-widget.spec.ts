import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoardWidget } from './select-board-widget';

describe('SelectBoardWidget', () => {
  let component: SelectBoardWidget;
  let fixture: ComponentFixture<SelectBoardWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBoardWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBoardWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
