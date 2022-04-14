import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMaterialContainerComponent } from './select-material-container.component';

describe('SelectMaterialContainerComponent', () => {
  let component: SelectMaterialContainerComponent;
  let fixture: ComponentFixture<SelectMaterialContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMaterialContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMaterialContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
