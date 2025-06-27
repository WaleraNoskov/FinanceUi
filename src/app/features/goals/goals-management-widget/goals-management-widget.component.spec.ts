import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsManagementWidget } from './goals-management-widget.component';

describe('Goals component', () => {
  let component: GoalsManagementWidget;
  let fixture: ComponentFixture<GoalsManagementWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalsManagementWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalsManagementWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
