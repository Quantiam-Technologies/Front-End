import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgaDatabaseComponent } from './tga-database.component';

describe('TgaDatabaseComponent', () => {
  let component: TgaDatabaseComponent;
  let fixture: ComponentFixture<TgaDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgaDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgaDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
