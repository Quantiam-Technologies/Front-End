import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelTypeComponent } from './steel-type.component';

describe('SteelTypeComponent', () => {
  let component: SteelTypeComponent;
  let fixture: ComponentFixture<SteelTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteelTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
