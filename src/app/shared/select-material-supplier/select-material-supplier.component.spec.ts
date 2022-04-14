import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMaterialSupplierComponent } from './select-material-supplier.component';

describe('SelectMaterialSupplierComponent', () => {
  let component: SelectMaterialSupplierComponent;
  let fixture: ComponentFixture<SelectMaterialSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMaterialSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMaterialSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
