import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExSheetComponent } from './ex-sheet.component';

describe('ExSheetComponent', () => {
  let component: ExSheetComponent;
  let fixture: ComponentFixture<ExSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
