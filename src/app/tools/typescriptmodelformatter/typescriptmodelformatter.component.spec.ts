import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescriptmodelformatterComponent } from './typescriptmodelformatter.component';

describe('TypescriptmodelformatterComponent', () => {
  let component: TypescriptmodelformatterComponent;
  let fixture: ComponentFixture<TypescriptmodelformatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypescriptmodelformatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescriptmodelformatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
