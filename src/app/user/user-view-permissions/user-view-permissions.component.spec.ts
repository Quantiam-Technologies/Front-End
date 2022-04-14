import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewPermissionsComponent } from './user-view-permissions.component';

describe('UserViewPermissionsComponent', () => {
  let component: UserViewPermissionsComponent;
  let fixture: ComponentFixture<UserViewPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
