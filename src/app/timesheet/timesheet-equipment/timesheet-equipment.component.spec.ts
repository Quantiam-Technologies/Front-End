import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetEquipmentComponent } from './timesheet-equipment.component';

describe('TimesheetEquipmentComponent', () => {
  let component: TimesheetEquipmentComponent;
  let fixture: ComponentFixture<TimesheetEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
