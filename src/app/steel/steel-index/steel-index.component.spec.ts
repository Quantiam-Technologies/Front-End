import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelIndexComponent } from './steel-index.component';

describe('SteelIndexComponent', () => {
  let component: SteelIndexComponent;
  let fixture: ComponentFixture<SteelIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteelIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteelIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
