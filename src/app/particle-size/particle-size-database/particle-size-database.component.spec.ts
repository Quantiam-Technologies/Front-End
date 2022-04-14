import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleSizeDatabaseComponent } from './particle-size-database.component';

describe('ParticleSizeDatabaseComponent', () => {
  let component: ParticleSizeDatabaseComponent;
  let fixture: ComponentFixture<ParticleSizeDatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticleSizeDatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticleSizeDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
