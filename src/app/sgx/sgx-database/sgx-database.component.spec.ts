import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgxDatabaseComponent } from './sgx-database.component';

describe('SgxDatabaseComponent', () => {
  let component: SgxDatabaseComponent;
  let fixture: ComponentFixture<SgxDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgxDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgxDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
