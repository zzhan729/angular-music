import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Song } from 'src/app/services/data-type/common.types';

@Component({
  selector: 'app-music-play-panel',
  templateUrl: './music-play-panel.component.html',
  styleUrls: ['./music-play-panel.component.less']
})
export class MusicPlayPanelComponent implements OnInit, OnChanges {
  @Input() songList: Song[];
  @Input() currentSong: Song;
  @Input() currentIndex: number
  @Input() show:boolean;

  @Output() onClose = new EventEmitter<void>()
  @Output() onChangeSong = new EventEmitter<Song>()
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes:SimpleChanges):void {
    if (changes['songList']){
      console.log('songList', this.songList);
    }
    if (changes['currentSong']){
      console.log('currentSong', this.currentSong);
    } 
  }



}
