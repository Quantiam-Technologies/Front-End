import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetRtoViewComponent } from './timesheet-rto-view.component';

describe('TimesheetRtoViewComponent', () => {
  let component: TimesheetRtoViewComponent;
  let fixture: ComponentFixture<TimesheetRtoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetRtoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetRtoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
