import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnaceRunDatabaseComponent } from './furnace-run-database.component';

describe('FurnaceRunDatabaseComponent', () => {
  let component: FurnaceRunDatabaseComponent;
  let fixture: ComponentFixture<FurnaceRunDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnaceRunDatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FurnaceRunDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
