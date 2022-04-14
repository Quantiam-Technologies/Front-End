import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetIndexComponent } from './timesheet-index.component';

describe('TimesheetIndexComponent', () => {
  let component: TimesheetIndexComponent;
  let fixture: ComponentFixture<TimesheetIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
