import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetRtoAllocationComponent } from './timesheet-rto-allocation.component';

describe('TimesheetRtoAllocationComponent', () => {
  let component: TimesheetRtoAllocationComponent;
  let fixture: ComponentFixture<TimesheetRtoAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetRtoAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetRtoAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
