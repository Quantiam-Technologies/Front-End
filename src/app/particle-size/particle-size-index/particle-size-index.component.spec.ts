import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleSizeIndexComponent } from './particle-size-index.component';

describe('ParticleSizeIndexComponent', () => {
  let component: ParticleSizeIndexComponent;
  let fixture: ComponentFixture<ParticleSizeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticleSizeIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticleSizeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
