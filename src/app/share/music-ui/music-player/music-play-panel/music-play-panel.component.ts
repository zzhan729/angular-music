import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Song } from 'src/app/services/data-type/common.types';
import { MusicScollComponent } from '../music-scoll/music-scoll.component';

@Component({
  selector: 'app-music-play-panel',
  templateUrl: './music-play-panel.component.html',
  styleUrls: ['./music-play-panel.component.less']
})
export class MusicPlayPanelComponent implements OnInit, OnChanges {
  @Input() songList: Song[];
  @Input() currentSong: Song;
  @Input() currentIndex: number
  @Input() show: boolean;

  @Output() onClose = new EventEmitter<void>()
  @Output() onChangeSong = new EventEmitter<Song>()

  @ViewChildren(MusicScollComponent) private musicScoll: QueryList<MusicScollComponent>
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songList']) {
      console.log('songList', this.songList);
    }
    if (changes['currentSong']) {
      console.log('currentSong', this.currentSong);
    }
    if (changes['show']) {
      if (!changes['show'].firstChange && this.show)
        this.musicScoll.first.refreshScroll();
    }
  }
}



