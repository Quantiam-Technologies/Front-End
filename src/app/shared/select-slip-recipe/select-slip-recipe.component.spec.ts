import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSlipRecipeComponent } from './select-slip-recipe.component';

describe('SelectSlipRecipeComponent', () => {
  let component: SelectSlipRecipeComponent;
  let fixture: ComponentFixture<SelectSlipRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectSlipRecipeComponent]
    });
    fixture = TestBed.createComponent(SelectSlipRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
