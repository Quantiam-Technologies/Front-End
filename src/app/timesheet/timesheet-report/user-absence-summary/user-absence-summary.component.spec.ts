import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAbsenceSummaryComponent } from './user-absence-summary.component';

describe('UserAbsenceSummaryComponent', () => {
  let component: UserAbsenceSummaryComponent;
  let fixture: ComponentFixture<UserAbsenceSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAbsenceSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAbsenceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
