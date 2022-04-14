import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgxScaleAuthComponent } from './sgx-scale-auth.component';

describe('SgxScaleAuthComponent', () => {
  let component: SgxScaleAuthComponent;
  let fixture: ComponentFixture<SgxScaleAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgxScaleAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgxScaleAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
