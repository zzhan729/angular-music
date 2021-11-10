import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less']
})
export class MusicPlayerComponent implements OnInit {
  sliderValue = 35
  bufferOffset = 70
  constructor() { }

  ngOnInit(): void {
  }

}
