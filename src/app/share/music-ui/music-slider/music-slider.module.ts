import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicSliderComponent } from './music-slider.component';
import { MusicSliderTrackComponent } from './music-slider-track.component';
import { MusicSliderHandleComponent } from './music-slider-handle.component';



@NgModule({
  declarations: [MusicSliderComponent, MusicSliderHandleComponent,MusicSliderTrackComponent],
  imports: [
    CommonModule
  ],
  exports: [MusicSliderComponent]
})
export class MusicSliderModule { }
