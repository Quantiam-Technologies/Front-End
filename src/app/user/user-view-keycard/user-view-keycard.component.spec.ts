import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewKeycardComponent } from './user-view-keycard.component';

describe('UserViewKeycardComponent', () => {
  let component: UserViewKeycardComponent;
  let fixture: ComponentFixture<UserViewKeycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewKeycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewKeycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
