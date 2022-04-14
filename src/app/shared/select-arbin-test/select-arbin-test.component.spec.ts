import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectArbinTestComponent } from './select-arbin-test.component';

describe('SelectArbinTestComponent', () => {
  let component: SelectArbinTestComponent;
  let fixture: ComponentFixture<SelectArbinTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectArbinTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectArbinTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
