import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XrdIndexComponent } from './xrd-index.component';

describe('XrdIndexComponent', () => {
  let component: XrdIndexComponent;
  let fixture: ComponentFixture<XrdIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XrdIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XrdIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
