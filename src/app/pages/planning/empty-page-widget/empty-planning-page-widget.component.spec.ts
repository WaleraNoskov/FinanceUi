import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPlanningPageWidget } from './empty-planning-page-widget.component';

describe('EmptyPageWidget', () => {
  let component: EmptyPlanningPageWidget;
  let fixture: ComponentFixture<EmptyPlanningPageWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyPlanningPageWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyPlanningPageWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
