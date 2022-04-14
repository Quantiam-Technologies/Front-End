import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRTOBankStatusComponent } from './user-rtobank-status.component';

describe('UserRTOBankStatusComponent', () => {
  let component: UserRTOBankStatusComponent;
  let fixture: ComponentFixture<UserRTOBankStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRTOBankStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRTOBankStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
