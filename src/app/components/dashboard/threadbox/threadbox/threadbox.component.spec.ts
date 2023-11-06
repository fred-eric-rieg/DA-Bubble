import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadboxComponent } from './threadbox.component';

describe('ThreadboxComponent', () => {
  let component: ThreadboxComponent;
  let fixture: ComponentFixture<ThreadboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadboxComponent]
    });
    fixture = TestBed.createComponent(ThreadboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
