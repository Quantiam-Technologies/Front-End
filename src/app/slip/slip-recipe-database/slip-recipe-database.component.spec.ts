import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipRecipeDatabaseComponent } from './slip-recipe-database.component';

describe('SlipRecipeDatabaseComponent', () => {
  let component: SlipRecipeDatabaseComponent;
  let fixture: ComponentFixture<SlipRecipeDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlipRecipeDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipRecipeDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
