import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVisualizerComponent } from './search-visualizer.component';

describe('SearchVisualizerComponent', () => {
  let component: SearchVisualizerComponent;
  let fixture: ComponentFixture<SearchVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
