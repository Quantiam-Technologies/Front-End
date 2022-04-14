import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInsightUnpaidComponent } from './company-insight-unpaid.component';

describe('CompanyInsightUnpaidComponent', () => {
  let component: CompanyInsightUnpaidComponent;
  let fixture: ComponentFixture<CompanyInsightUnpaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInsightUnpaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInsightUnpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
