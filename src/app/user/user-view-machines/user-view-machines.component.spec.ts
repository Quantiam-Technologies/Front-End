import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewMachinesComponent } from './user-view-machines.component';

describe('UserViewMachinesComponent', () => {
  let component: UserViewMachinesComponent;
  let fixture: ComponentFixture<UserViewMachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewMachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
