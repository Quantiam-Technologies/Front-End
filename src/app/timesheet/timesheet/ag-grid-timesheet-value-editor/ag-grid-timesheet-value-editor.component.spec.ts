import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTimesheetValueEditorComponent } from './ag-grid-timesheet-value-editor.component';

describe('AgGridTimesheetValueEditorComponent', () => {
  let component: AgGridTimesheetValueEditorComponent;
  let fixture: ComponentFixture<AgGridTimesheetValueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridTimesheetValueEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTimesheetValueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
