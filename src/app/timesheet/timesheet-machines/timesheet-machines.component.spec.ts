import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetMachinesComponent } from './timesheet-machines.component';

describe('TimesheetMachinesComponent', () => {
  let component: TimesheetMachinesComponent;
  let fixture: ComponentFixture<TimesheetMachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetMachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
