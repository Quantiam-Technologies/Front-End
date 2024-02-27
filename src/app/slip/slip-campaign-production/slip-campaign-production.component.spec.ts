import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipCampaignProductionComponent } from './slip-campaign-production.component';

describe('SlipCampaignProductionComponent', () => {
  let component: SlipCampaignProductionComponent;
  let fixture: ComponentFixture<SlipCampaignProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlipCampaignProductionComponent]
    });
    fixture = TestBed.createComponent(SlipCampaignProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
