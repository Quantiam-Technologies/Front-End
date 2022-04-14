import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsScalebarComponent } from './tools-scalebar.component';

describe('ToolsScalebarComponent', () => {
  let component: ToolsScalebarComponent;
  let fixture: ComponentFixture<ToolsScalebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsScalebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsScalebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
