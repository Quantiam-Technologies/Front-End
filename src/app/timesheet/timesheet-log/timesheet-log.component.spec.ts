import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetLogComponent } from './timesheet-log.component';

describe('TimesheetLogComponent', () => {
  let component: TimesheetLogComponent;
  let fixture: ComponentFixture<TimesheetLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
