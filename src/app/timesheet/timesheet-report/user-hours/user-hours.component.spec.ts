import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHoursComponent } from './user-hours.component';

describe('UserHoursComponent', () => {
  let component: UserHoursComponent;
  let fixture: ComponentFixture<UserHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
