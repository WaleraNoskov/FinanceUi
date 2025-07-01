import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableBoardsList } from './editable-boards-list';

describe('EditableBoardsList', () => {
  let component: EditableBoardsList;
  let fixture: ComponentFixture<EditableBoardsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableBoardsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableBoardsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
