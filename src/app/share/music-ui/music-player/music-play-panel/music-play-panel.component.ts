import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Song } from 'src/app/services/data-type/common.types';
import { findIndex } from 'src/app/utils/array';
import { MusicScollComponent } from '../music-scoll/music-scoll.component';

@Component({
  selector: 'app-music-play-panel',
  templateUrl: './music-play-panel.component.html',
  styleUrls: ['./music-play-panel.component.less']
})
export class MusicPlayPanelComponent implements OnInit, OnChanges {
  @Input() songList: Song[];
  @Input() currentSong: Song;
  currentIndex: number
  @Input() show: boolean;

  @Output() onClose = new EventEmitter<void>()
  @Output() onChangeSong = new EventEmitter<Song>()

  scrollY = 0

  @ViewChildren(MusicScollComponent) private musicScroll: QueryList<MusicScollComponent>
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songList']) {
      console.log('songList', this.songList);
      this.currentIndex = 0;
    }
    if (changes['currentSong']) {
      if (this.currentSong){
        this.currentIndex = findIndex(this.songList, this.currentSong)
        if(this.show){
          this.scrollToCurrent(0)
        }
      }
    }
    if (changes['show']) {
      if (!changes['show'].firstChange && this.show)
        this.musicScroll.first.refreshScroll();
    }
  }
  private scrollToCurrent (speed = 300) {
    const songListRefs = this.musicScroll.first.el.nativeElement.querySelectorAll('ul li');
    
    if (songListRefs.length) {
      const currentLi = songListRefs[this.currentIndex || 0] as HTMLElement;
      const offsetTop = currentLi.offsetTop;
      const offsetHeight = currentLi.offsetHeight;   
      if (((offsetTop - Math.abs(this.scrollY)) > offsetHeight * 5) || (offsetTop < Math.abs(this.scrollY))) {
        this.musicScroll.first.scrollToElement(currentLi, speed, false, false);
      }
    }
    
  }
}




