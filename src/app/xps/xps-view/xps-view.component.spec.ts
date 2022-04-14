import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XpsViewComponent } from './xps-view.component';

describe('XpsViewComponent', () => {
  let component: XpsViewComponent;
  let fixture: ComponentFixture<XpsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XpsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
