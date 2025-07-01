import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsManagementWidget } from './boards-management-widget';

describe('BoardsManagementWidget', () => {
  let component: BoardsManagementWidget;
  let fixture: ComponentFixture<BoardsManagementWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardsManagementWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsManagementWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
