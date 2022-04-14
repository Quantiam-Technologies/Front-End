import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelTypeDatabaseComponent } from './steel-type-database.component';

describe('SteelTypeDatabaseComponent', () => {
  let component: SteelTypeDatabaseComponent;
  let fixture: ComponentFixture<SteelTypeDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteelTypeDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteelTypeDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
