import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayBarChartComponent } from './array-bar-chart.component';

describe('ArrayBarChartComponent', () => {
  let component: ArrayBarChartComponent;
  let fixture: ComponentFixture<ArrayBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
