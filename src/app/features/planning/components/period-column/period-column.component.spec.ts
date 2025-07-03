import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodColumnComponent } from './period-column.component';

describe('PeriodColumn', () => {
  let component: PeriodColumnComponent;
  let fixture: ComponentFixture<PeriodColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
