import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceDatabaseComponent } from './furnace-database.component';

describe('FurnaceDatabaseComponent', () => {
  let component: FurnaceDatabaseComponent;
  let fixture: ComponentFixture<FurnaceDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnaceDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FurnaceDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
