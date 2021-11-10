import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player.component';
import { MusicSliderModule } from '../music-slider/music-slider.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MusicPlayerComponent],
  imports: [
    CommonModule,
    MusicSliderModule,
    FormsModule
  ],
  exports:[MusicPlayerComponent]
})
export class MusicPlayerModule { }
