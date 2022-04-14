import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialHazardSymbolSelectorComponent } from './material-hazard-symbol-selector.component';

describe('MaterialHazardSymbolSelectorComponent', () => {
  let component: MaterialHazardSymbolSelectorComponent;
  let fixture: ComponentFixture<MaterialHazardSymbolSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialHazardSymbolSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialHazardSymbolSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
