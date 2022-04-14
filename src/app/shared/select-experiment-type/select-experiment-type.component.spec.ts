import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExperimentTypeComponent } from './select-experiment-type.component';

describe('SelectExperimentTypeComponent', () => {
  let component: SelectExperimentTypeComponent;
  let fixture: ComponentFixture<SelectExperimentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExperimentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExperimentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
