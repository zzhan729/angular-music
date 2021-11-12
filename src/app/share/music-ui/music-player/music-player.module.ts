import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player.component';
import { MusicSliderModule } from '../music-slider/music-slider.module';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { MusicPlayPanelComponent } from './music-play-panel/music-play-panel.component';



@NgModule({
  declarations: [
    MusicPlayerComponent, 
    FormatTimePipe, 
    MusicPlayPanelComponent
  ],
  imports: [
    CommonModule,
    MusicSliderModule,
    FormsModule,
    MusicSliderModule
    
  ],
  exports:[MusicPlayerComponent, FormatTimePipe]
})
export class MusicPlayerModule { }
