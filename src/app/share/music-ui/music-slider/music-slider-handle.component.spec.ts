import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSliderHandleComponent } from './music-slider-handle.component';

describe('MusicSliderHandleComponent', () => {
  let component: MusicSliderHandleComponent;
  let fixture: ComponentFixture<MusicSliderHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicSliderHandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSliderHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
