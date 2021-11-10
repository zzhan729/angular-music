import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit,  SimpleChanges } from '@angular/core';
import { musicSliderStyle } from './music-slider-types';

@Component({
  selector: 'app-music-slider-track',
  template: '<div class="music-slider-track" [class.buffer]="musicBuffer" [ngStyle]="style"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicSliderTrackComponent implements OnInit, OnChanges {
  @Input() musicVertical = false;
  @Input() musicLenth: number;
  @Input() musicBuffer = false;

  style: musicSliderStyle ={}
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes.musicLenth){
      if (this.musicVertical){
        this.style.height = this.musicLenth + '%';
        this.style.left = null;
        this.style.width = null;
      }else{
        this.style.width = this.musicLenth + '%';
        this.style.height = null;
        this.style.bottom = null;
      }
    }
  }


}
