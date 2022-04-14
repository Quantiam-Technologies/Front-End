import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCreationDialog2021Component } from './material-creation-dialog2021.component';

describe('MaterialCreationDialog2021Component', () => {
  let component: MaterialCreationDialog2021Component;
  let fixture: ComponentFixture<MaterialCreationDialog2021Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialCreationDialog2021Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCreationDialog2021Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
