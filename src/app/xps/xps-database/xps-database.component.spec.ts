import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XpsDatabaseComponent } from './xps-database.component';

describe('XpsDatabaseComponent', () => {
  let component: XpsDatabaseComponent;
  let fixture: ComponentFixture<XpsDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpsDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XpsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
