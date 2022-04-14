import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetRtoComponent } from './timesheet-rto.component';

describe('TimesheetRtoComponent', () => {
  let component: TimesheetRtoComponent;
  let fixture: ComponentFixture<TimesheetRtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetRtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetRtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
