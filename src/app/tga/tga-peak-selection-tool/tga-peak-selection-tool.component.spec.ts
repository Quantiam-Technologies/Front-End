import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgaPeakSelectionToolComponent } from './tga-peak-selection-tool.component';

describe('TgaPeakSelectionToolComponent', () => {
  let component: TgaPeakSelectionToolComponent;
  let fixture: ComponentFixture<TgaPeakSelectionToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgaPeakSelectionToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgaPeakSelectionToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
