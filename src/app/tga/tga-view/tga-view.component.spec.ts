import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgaViewComponent } from './tga-view.component';

describe('TgaViewComponent', () => {
  let component: TgaViewComponent;
  let fixture: ComponentFixture<TgaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
