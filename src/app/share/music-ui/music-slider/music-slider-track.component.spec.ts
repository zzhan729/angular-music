import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSliderTrackComponent } from './music-slider-track.component';

describe('MusicSliderTrackComponent', () => {
  let component: MusicSliderTrackComponent;
  let fixture: ComponentFixture<MusicSliderTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicSliderTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSliderTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
