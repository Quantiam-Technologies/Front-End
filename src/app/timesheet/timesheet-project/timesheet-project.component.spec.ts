import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetProjectComponent } from './timesheet-project.component';

describe('TimesheetProjectComponent', () => {
  let component: TimesheetProjectComponent;
  let fixture: ComponentFixture<TimesheetProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
