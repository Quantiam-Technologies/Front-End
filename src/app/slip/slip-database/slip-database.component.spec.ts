import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipDatabaseComponent } from './slip-database.component';

describe('SlipDatabaseComponent', () => {
  let component: SlipDatabaseComponent;
  let fixture: ComponentFixture<SlipDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlipDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
