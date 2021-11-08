import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSliderComponent } from './music-slider.component';

describe('MusicSliderComponent', () => {
  let component: MusicSliderComponent;
  let fixture: ComponentFixture<MusicSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
