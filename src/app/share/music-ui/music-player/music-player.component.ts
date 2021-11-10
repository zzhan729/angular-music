import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Song } from 'src/app/services/data-type/common.types';
import { AppStoreModule } from 'src/app/store';
import { getCurrentIndex, getCurrentSong, getPlayer, getPlayList, getPlayMode, getSongList } from 'src/app/store/selectors/player.selector';
import { PlayMode } from './player-type';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less']
})
export class MusicPlayerComponent implements OnInit {
  sliderValue = 35;
  bufferOffset = 70;
  //api get variable
  songList: [];
  playList: [];
  currentIndex: number;
  //current song data
  currentSong: Song
  duration: number
  currentTime: number


  @ViewChild('audio',{static: true}) private audio: ElementRef
  private audioEl: HTMLAudioElement

  constructor(
    private store$: Store<AppStoreModule>
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => {
      this.watchList(list, 'songList')
    });
    appStore$.pipe(select(getPlayList)).subscribe(list =>{
      this.watchList(list, 'playList')
    });
    appStore$.pipe(select(getCurrentIndex)).subscribe(index =>{
      this.watchCurrentIndex(index)
    });
    appStore$.pipe(select(getPlayMode)).subscribe(mode => {
      this.watchPlayMode(mode)
    });
    appStore$.pipe(select(getCurrentSong)).subscribe(song => {
      this.watchCurrentSong(song)
    });
 
  }

  ngOnInit(): void {
    this.audioEl = this.audio.nativeElement
  }

  ngAfterViewInit():void {
    
  }

  private watchList(list: Song[], type: string) {
    this[type] = list;
  }

  private watchCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  private watchPlayMode(mode:PlayMode){
    console.log("mode: ",mode);
  }

  private watchCurrentSong(song:Song){
    if (song){
      this.currentSong = song;
      this.duration = song.dt / 1000
    }else{
      this.duration = 0;
    }
    console.log("song: ",song);
  }

  onCanPlay(){
    this.play()
  }

  onTimeUpdate(e: Event){
    this.currentTime = (<HTMLAudioElement>e.target).currentTime  
  }

  play(){
    this.audioEl.play()
  }

  get picUrl():string {
    return this.currentSong ? this.currentSong.al.picUrl : '//s4.music.126.net/style/web2/img/default/default_album.jpg'
  }


}
