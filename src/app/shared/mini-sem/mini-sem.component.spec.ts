import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniSemComponent } from './mini-sem.component';

describe('MiniSemComponent', () => {
  let component: MiniSemComponent;
  let fixture: ComponentFixture<MiniSemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniSemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniSemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
