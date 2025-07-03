import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoardDialog } from './delete-board-dialog';

describe('DeleteBoardDialog', () => {
  let component: DeleteBoardDialog;
  let fixture: ComponentFixture<DeleteBoardDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBoardDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoardDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
