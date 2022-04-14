import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetStatisticsUserComponent } from './timesheet-statistics-user.component';

describe('TimesheetStatisticsUserComponent', () => {
  let component: TimesheetStatisticsUserComponent;
  let fixture: ComponentFixture<TimesheetStatisticsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetStatisticsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetStatisticsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
