import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridParticlePdfComponent } from './ag-grid-particle-pdf.component';

describe('AgGridParticlePdfComponent', () => {
  let component: AgGridParticlePdfComponent;
  let fixture: ComponentFixture<AgGridParticlePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridParticlePdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridParticlePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
