import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityCampaignPowderCharacterizationCheckComponent } from './quality-campaign-powder-characterization-check.component';

describe('QualityCampaignPowderCharacterizationCheckComponent', () => {
  let component: QualityCampaignPowderCharacterizationCheckComponent;
  let fixture: ComponentFixture<QualityCampaignPowderCharacterizationCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualityCampaignPowderCharacterizationCheckComponent]
    });
    fixture = TestBed.createComponent(QualityCampaignPowderCharacterizationCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
