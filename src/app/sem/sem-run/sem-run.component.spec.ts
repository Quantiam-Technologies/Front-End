import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemRunComponent } from './sem-run.component';

describe('SemRunComponent', () => {
  let component: SemRunComponent;
  let fixture: ComponentFixture<SemRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
