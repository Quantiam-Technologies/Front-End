import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInsightHeadcountComponent } from './company-insight-headcount.component';

describe('CompanyInsightHeadcountComponent', () => {
  let component: CompanyInsightHeadcountComponent;
  let fixture: ComponentFixture<CompanyInsightHeadcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInsightHeadcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInsightHeadcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
