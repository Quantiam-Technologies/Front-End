import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDatabaseComponent } from './car-database.component';

describe('CarDatabaseComponent', () => {
  let component: CarDatabaseComponent;
  let fixture: ComponentFixture<CarDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
