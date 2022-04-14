import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetHolidayComponent } from './timesheet-holiday.component';

describe('TimesheetHolidayComponent', () => {
  let component: TimesheetHolidayComponent;
  let fixture: ComponentFixture<TimesheetHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
