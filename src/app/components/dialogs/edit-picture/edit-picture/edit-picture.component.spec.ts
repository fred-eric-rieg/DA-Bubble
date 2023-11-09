import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPictureComponent } from './edit-picture.component';

describe('EditPictureComponent', () => {
  let component: EditPictureComponent;
  let fixture: ComponentFixture<EditPictureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPictureComponent]
    });
    fixture = TestBed.createComponent(EditPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
