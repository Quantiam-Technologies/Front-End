import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSampleComponent } from './select-sample.component';

describe('SelectSampleComponent', () => {
  let component: SelectSampleComponent;
  let fixture: ComponentFixture<SelectSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
