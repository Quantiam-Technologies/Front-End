import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipAnalyticIndexComponent } from './slip-analytic-index.component';

describe('SlipAnalyticIndexComponent', () => {
  let component: SlipAnalyticIndexComponent;
  let fixture: ComponentFixture<SlipAnalyticIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlipAnalyticIndexComponent]
    });
    fixture = TestBed.createComponent(SlipAnalyticIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
