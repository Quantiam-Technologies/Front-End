import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHazardComponent } from './select-hazard.component';

describe('SelectHazardComponent', () => {
  let component: SelectHazardComponent;
  let fixture: ComponentFixture<SelectHazardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHazardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHazardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
