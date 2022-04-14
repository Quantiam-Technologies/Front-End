import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSteelTypeComponent } from './select-steel-type.component';

describe('SelectSteelTypeComponent', () => {
  let component: SelectSteelTypeComponent;
  let fixture: ComponentFixture<SelectSteelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSteelTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSteelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
