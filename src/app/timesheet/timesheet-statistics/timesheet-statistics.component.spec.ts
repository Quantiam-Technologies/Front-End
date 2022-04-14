import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetStatisticsComponent } from './timesheet-statistics.component';

describe('TimesheetStatisticsComponent', () => {
  let component: TimesheetStatisticsComponent;
  let fixture: ComponentFixture<TimesheetStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
