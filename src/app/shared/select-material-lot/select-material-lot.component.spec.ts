import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMaterialLotComponent } from './select-material-lot.component';

describe('SelectMaterialLotComponent', () => {
  let component: SelectMaterialLotComponent;
  let fixture: ComponentFixture<SelectMaterialLotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMaterialLotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMaterialLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
