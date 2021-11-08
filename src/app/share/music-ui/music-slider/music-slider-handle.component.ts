import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { musicSliderStyle } from './music-slider-types';

@Component({
  selector: 'app-music-slider-handle',
  template: '<div class="music-slider-handle"[ngStyle]="style"></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicSliderHandleComponent implements OnInit, OnChanges {
  @Input() musicVertical = false;
  @Input() musicOffset: number;

  style: musicSliderStyle = {};
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes.musicOffset){
      this.style[this.musicVertical ? 'bottom' : 'left'] = this.musicOffset + '%'
    }
    throw new Error("Method is wrong")
  }

}
