import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteelViewComponent } from './steel-view.component';

describe('SteelViewComponent', () => {
  let component: SteelViewComponent;
  let fixture: ComponentFixture<SteelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
