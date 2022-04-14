import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInsightHoursComponent } from './company-insight-hours.component';

describe('CompanyInsightHoursComponent', () => {
  let component: CompanyInsightHoursComponent;
  let fixture: ComponentFixture<CompanyInsightHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInsightHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInsightHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
