import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrDatabaseComponent } from './ncr-database.component';

describe('NcrDatabaseComponent', () => {
  let component: NcrDatabaseComponent;
  let fixture: ComponentFixture<NcrDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcrDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcrDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
