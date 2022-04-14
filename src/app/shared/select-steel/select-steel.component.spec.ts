import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSteelComponent } from './select-steel.component';

describe('SelectSteelComponent', () => {
  let component: SelectSteelComponent;
  let fixture: ComponentFixture<SelectSteelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSteelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSteelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
