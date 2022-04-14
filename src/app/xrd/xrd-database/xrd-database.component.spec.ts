import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XrdDatabaseComponent } from './xrd-database.component';

describe('XrdDatabaseComponent', () => {
  let component: XrdDatabaseComponent;
  let fixture: ComponentFixture<XrdDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XrdDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XrdDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
