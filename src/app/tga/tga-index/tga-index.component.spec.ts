import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgaIndexComponent } from './tga-index.component';

describe('TgaIndexComponent', () => {
  let component: TgaIndexComponent;
  let fixture: ComponentFixture<TgaIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgaIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgaIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
