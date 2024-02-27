import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipCampaignUsageComponent } from './slip-campaign-usage.component';

describe('SlipCampaignUsageComponent', () => {
  let component: SlipCampaignUsageComponent;
  let fixture: ComponentFixture<SlipCampaignUsageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlipCampaignUsageComponent]
    });
    fixture = TestBed.createComponent(SlipCampaignUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
