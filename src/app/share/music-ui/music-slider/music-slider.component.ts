import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-music-slider',
  templateUrl: './music-slider.component.html',
  styleUrls: ['./music-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
