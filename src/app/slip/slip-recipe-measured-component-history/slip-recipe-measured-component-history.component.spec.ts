import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipRecipeMeasuredComponentHistoryComponent } from './slip-recipe-measured-component-history.component';

describe('SlipRecipeMeasuredComponentHistoryComponent', () => {
  let component: SlipRecipeMeasuredComponentHistoryComponent;
  let fixture: ComponentFixture<SlipRecipeMeasuredComponentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlipRecipeMeasuredComponentHistoryComponent]
    });
    fixture = TestBed.createComponent(SlipRecipeMeasuredComponentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
