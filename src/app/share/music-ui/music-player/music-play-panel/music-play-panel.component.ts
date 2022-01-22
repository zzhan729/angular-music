import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { timer } from 'rxjs';
import { Song } from 'src/app/services/data-type/common.types';
import { SongService } from 'src/app/services/song.service';
import { findIndex } from 'src/app/utils/array';
import { MusicScollComponent } from '../music-scoll/music-scoll.component';
import { BaseLyricLine, musicLyric } from './music-lyric';

@Component({
  selector: 'app-music-play-panel',
  templateUrl: './music-play-panel.component.html',
  styleUrls: ['./music-play-panel.component.less']
})
export class MusicPlayPanelComponent implements OnInit, OnChanges {

  @Input() playing: boolean
  @Input() songList: Song[];
  @Input() currentSong: Song;
  currentIndex: number
  @Input() show: boolean;

  @Output() onClose = new EventEmitter<void>()
  @Output() onChangeSong = new EventEmitter<Song>()

  scrollY = 0

  currentLyric: BaseLyricLine[];

  private lyric:musicLyric;

  @ViewChildren(MusicScollComponent) private musicScroll: QueryList<MusicScollComponent>
  
  constructor(private songServe:SongService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['playing']){
      if(!changes['playing'].firstChange && this.playing){

      }
    }
    
    if (changes['songList']) {
      this.currentIndex = 0;
    }
    if (changes['currentSong']) {
      if (this.currentSong){
        this.currentIndex = findIndex(this.songList, this.currentSong)
        this.updateLyric()
        if(this.show){
          this.scrollToCurrent(0)
        }
      }
    }
    if (changes['show']) {
      if (!changes['show'].firstChange && this.show)
        this.musicScroll.first.refreshScroll();
        this.musicScroll.last.refreshScroll();
        timer(80).subscribe(()=>{
          this.scrollToCurrent(0);
        })
    }
  }


  private updateLyric(){
    this.songServe.getLyric(this.currentSong.id).subscribe(res=>{
     // console.log("Lyric", res);
      this.lyric = new musicLyric(res);
      this.currentLyric = this.lyric.realLine;
      console.log("playpanelLines:", this.currentLyric);
      this.musicScroll.last.scrollTo(0,0);

      if(this.playing){
        this.lyric.play()
      }
      
      
    })
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





