import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAnalysisCellComponent } from './display-analysis-cell.component';

describe('DisplayAnalysisCellComponent', () => {
  let component: DisplayAnalysisCellComponent;
  let fixture: ComponentFixture<DisplayAnalysisCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAnalysisCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAnalysisCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
