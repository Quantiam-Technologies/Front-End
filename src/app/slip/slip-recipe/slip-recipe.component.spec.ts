import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipRecipeComponent } from './slip-recipe.component';

describe('SlipRecipeComponent', () => {
  let component: SlipRecipeComponent;
  let fixture: ComponentFixture<SlipRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlipRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
