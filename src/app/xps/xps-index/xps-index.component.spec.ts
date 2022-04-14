import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XpsIndexComponent } from './xps-index.component';

describe('XpsIndexComponent', () => {
  let component: XpsIndexComponent;
  let fixture: ComponentFixture<XpsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XpsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
