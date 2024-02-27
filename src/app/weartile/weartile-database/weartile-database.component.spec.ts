import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeartileDatabaseComponent } from './weartile-database.component';

describe('WeartileDatabaseComponent', () => {
  let component: WeartileDatabaseComponent;
  let fixture: ComponentFixture<WeartileDatabaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeartileDatabaseComponent]
    });
    fixture = TestBed.createComponent(WeartileDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
