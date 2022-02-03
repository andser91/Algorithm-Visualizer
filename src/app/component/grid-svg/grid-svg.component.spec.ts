import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSvgComponent } from './grid-svg.component';

describe('GridSvgComponent', () => {
  let component: GridSvgComponent;
  let fixture: ComponentFixture<GridSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridSvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
