import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetSimpleComponent } from './timesheet-simple.component';

describe('TimesheetSimpleComponent', () => {
  let component: TimesheetSimpleComponent;
  let fixture: ComponentFixture<TimesheetSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
