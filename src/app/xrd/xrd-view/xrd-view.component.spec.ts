import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XrdViewComponent } from './xrd-view.component';

describe('XrdViewComponent', () => {
  let component: XrdViewComponent;
  let fixture: ComponentFixture<XrdViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XrdViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XrdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
