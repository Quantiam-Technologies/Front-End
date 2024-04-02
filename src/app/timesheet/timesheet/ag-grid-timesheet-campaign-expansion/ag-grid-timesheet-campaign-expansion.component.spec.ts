import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTimesheetCampaignExpansionComponent } from './ag-grid-timesheet-campaign-expansion.component';

describe('AgGridTimesheetCampaignExpansionComponent', () => {
  let component: AgGridTimesheetCampaignExpansionComponent;
  let fixture: ComponentFixture<AgGridTimesheetCampaignExpansionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgGridTimesheetCampaignExpansionComponent]
    });
    fixture = TestBed.createComponent(AgGridTimesheetCampaignExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
