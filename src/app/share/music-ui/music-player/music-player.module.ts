import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player.component';
import { MusicSliderModule } from '../music-slider/music-slider.module';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from '../../pipes/format-time.pipe';



@NgModule({
  declarations: [MusicPlayerComponent, FormatTimePipe],
  imports: [
    CommonModule,
    MusicSliderModule,
    FormsModule,
    
  ],
  exports:[MusicPlayerComponent, FormatTimePipe]
})
export class MusicPlayerModule { }
