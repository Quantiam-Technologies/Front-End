import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemDatabaseComponent } from './sem-database.component';

describe('SemDatabaseComponent', () => {
  let component: SemDatabaseComponent;
  let fixture: ComponentFixture<SemDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
