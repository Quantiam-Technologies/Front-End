import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelDatabaseComponent } from './steel-database.component';

describe('SteelDatabaseComponent', () => {
  let component: SteelDatabaseComponent;
  let fixture: ComponentFixture<SteelDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteelDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteelDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
