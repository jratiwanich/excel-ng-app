import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExCellComponent } from './ex-cell.component';

describe('ExCellComponent', () => {
  let component: ExCellComponent;
  let fixture: ComponentFixture<ExCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
