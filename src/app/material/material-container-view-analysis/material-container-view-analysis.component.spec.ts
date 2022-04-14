import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialContainerViewAnalysisComponent } from './material-container-view-analysis.component';

describe('MaterialContainerViewAnalysisComponent', () => {
  let component: MaterialContainerViewAnalysisComponent;
  let fixture: ComponentFixture<MaterialContainerViewAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialContainerViewAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialContainerViewAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
