import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Silt2023Component } from './silt2023.component';

describe('Silt2023Component', () => {
  let component: Silt2023Component;
  let fixture: ComponentFixture<Silt2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Silt2023Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Silt2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
