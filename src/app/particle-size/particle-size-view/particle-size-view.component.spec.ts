import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleSizeViewComponent } from './particle-size-view.component';

describe('ParticleSizeViewComponent', () => {
  let component: ParticleSizeViewComponent;
  let fixture: ComponentFixture<ParticleSizeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticleSizeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticleSizeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
