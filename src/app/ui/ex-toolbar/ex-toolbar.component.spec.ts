import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExToolbarComponent } from './ex-toolbar.component';

describe('ExToolbarComponent', () => {
  let component: ExToolbarComponent;
  let fixture: ComponentFixture<ExToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
