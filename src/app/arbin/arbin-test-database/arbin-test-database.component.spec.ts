import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbinTestDatabaseComponent } from './arbin-test-database.component';

describe('ArbinTestDatabaseComponent', () => {
  let component: ArbinTestDatabaseComponent;
  let fixture: ComponentFixture<ArbinTestDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbinTestDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbinTestDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
