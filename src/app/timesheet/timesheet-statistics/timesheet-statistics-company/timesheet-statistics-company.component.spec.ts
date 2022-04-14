import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetStatisticsCompanyComponent } from './timesheet-statistics-company.component';

describe('TimesheetStatisticsCompanyComponent', () => {
  let component: TimesheetStatisticsCompanyComponent;
  let fixture: ComponentFixture<TimesheetStatisticsCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetStatisticsCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetStatisticsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
