import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningWidget } from './planning-widget';

describe('PlanningWidget', () => {
  let component: PlanningWidget;
  let fixture: ComponentFixture<PlanningWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
