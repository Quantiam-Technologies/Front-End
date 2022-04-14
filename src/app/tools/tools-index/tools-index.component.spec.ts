import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsIndexComponent } from './tools-index.component';

describe('ToolsIndexComponent', () => {
  let component: ToolsIndexComponent;
  let fixture: ComponentFixture<ToolsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
