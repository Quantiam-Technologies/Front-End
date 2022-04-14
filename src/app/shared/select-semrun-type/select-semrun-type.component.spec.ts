import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSemrunTypeComponent } from './select-semrun-type.component';

describe('SelectSemrunTypeComponent', () => {
  let component: SelectSemrunTypeComponent;
  let fixture: ComponentFixture<SelectSemrunTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSemrunTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSemrunTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
