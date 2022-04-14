import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExperimentComponent } from './select-experiment.component';

describe('SelectExperimentComponent', () => {
  let component: SelectExperimentComponent;
  let fixture: ComponentFixture<SelectExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExperimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
