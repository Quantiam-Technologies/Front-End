import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipCampaignManufacturingComponent } from './slip-campaign-manufacturing.component';

describe('SlipCampaignManufacturingComponent', () => {
  let component: SlipCampaignManufacturingComponent;
  let fixture: ComponentFixture<SlipCampaignManufacturingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlipCampaignManufacturingComponent]
    });
    fixture = TestBed.createComponent(SlipCampaignManufacturingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
