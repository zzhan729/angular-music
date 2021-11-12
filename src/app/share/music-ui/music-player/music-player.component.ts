import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { from, fromEvent, Subscription } from 'rxjs';
import { Song, SongList } from 'src/app/services/data-type/common.types';
import { AppStoreModule } from 'src/app/store';
import { SetCurrentIndex, SetPlayList, SetPlayMode } from 'src/app/store/actions/player.actions';
import { getCurrentIndex, getCurrentSong, getPlayer, getPlayList, getPlayMode, getSongList } from 'src/app/store/selectors/player.selector';
import { shuffle } from 'src/app/utils/array';
import { PlayMode } from './player-type';

const modeType: PlayMode[] = [{
  type:'loop',
  label: 'Loop'
},{  
  type:'random',
  label: 'Shuffle'

},{  
  type:'single',
  label: 'Single Loop'
}
]

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.less']
})
export class MusicPlayerComponent implements OnInit {
  //Slider variable
  percentage = 0;
  bufferPercent = 0;

  //api get variable
  songList: Song[];
  playList: Song[];
  currentIndex: number;

  //current song data
  currentSong: Song
  duration: number
  currentTime: number

  //play status
  playing = false

  //song status
  songReady = false

  //Volume Panel
  volume = 50
  showVolumnPanel = false
  //determine if it is the volumn pannel
  selfClick = false; 
  private winClick: Subscription
  
  //Play Mode
  currentMode: PlayMode
  modeCount = 0;

  //List panel
  showPanel = false;


 



  @ViewChild('audio', { static: true }) private audio: ElementRef
  private audioEl: HTMLAudioElement

  constructor(
    private store$: Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc:Document
  ) {
    const appStore$ = this.store$.pipe(select(getPlayer));
    appStore$.pipe(select(getSongList)).subscribe(list => {
      this.watchList(list, 'songList')
    });
    appStore$.pipe(select(getPlayList)).subscribe(list => {
      this.watchList(list, 'playList')
    });
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => {
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

  ngAfterViewInit(): void {

  }

  private watchList(list: Song[], type: string) {
    this[type] = list;
  }

  private watchCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  private watchPlayMode(mode: PlayMode) {
    this.currentMode = mode
    if (this.songList){
      let list= this.songList.slice();
      if (mode.type ==="random"){
        list = shuffle(this.songList)   
        this.updateCurrentIndex(list, this.currentSong);
        this.store$.dispatch(SetPlayList({ playList:list }))
      }

      
    }
  }



  private watchCurrentSong(song: Song) {
    if (song) {
      this.currentSong = song;
      this.duration = song.dt / 1000
    } else {
      this.duration = 0;
    }
  }

  private updateCurrentIndex(list:Song[], song:Song){
    const newIndex = list.findIndex(item => item.id === song.id )
    this.store$.dispatch(SetCurrentIndex({ currentIndex: newIndex }))
  }

  //Change mode
  changeMode(){
    const temp = modeType[++this.modeCount % 3];
    this.store$.dispatch(SetPlayMode({playMode: temp}))
  }


  onPercentageChange(per: number) {
    this.audioEl.currentTime = this.duration * (per / 100)
  }

  onVolumeChange(per: number){
    this.audioEl.volume = per / 100;
  }

  toggleVolunm(){
    this.togglePanel("showVolumnPanel")
  }
  toggleListPanel(){
    if(this.songList.length){
      this.togglePanel("showPanel")
    }
    
  }

  togglePanel(type: string) {
    this[type] = !this[type];
    if (this.showVolumnPanel || this.showPanel){
      this.bindDocumentClickListner();
    }else{
      this.unbindDocumentClickListner();
    }
  }

  

  private bindDocumentClickListner(){
    if(!this.winClick){
      this.winClick = fromEvent(this.doc, 'click').subscribe(()=>{
        //if click the other than volumn part
        if(!this.selfClick){
          this.showVolumnPanel = false;
          this.showPanel = false
          this.unbindDocumentClickListner();
        }
        this.selfClick = false;
      })
    }
  }

  private unbindDocumentClickListner(){
    if(this.winClick){
      this.winClick.unsubscribe();
      this.winClick = null
    }

  }

  private updateIndex(index: number) {
    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    this.songReady = false
  }

  private loop() {
    this.audioEl.currentTime = 0;
    this.play();
  }

  onToggle() {
    if (!this.currentSong) {
      if (this.playList.length) {
        this.updateIndex(0)
      }
    } else {
      if (this.songReady) {
        this.playing = !this.playing
        if (this.playing) {
          this.audioEl.play()
        }
        else {
          this.audioEl.pause()
        }
      }

    }

  }
  //previous song
  onPrev(index: number) {
    if (!this.songReady) {
      return
    }
    if(this.playList.length === 1){
      this.loop();
    }
    const newIndex = index < 0 ? this.playList.length - 1 : index
    this.updateIndex(newIndex)
  }
  //next song
  onNext(index: number) {
    if (!this.songReady) {
      return
    }
    if(this.playList.length === 1){
      this.loop();
    }
    const newIndex = index >= this.playList.length ? 0 : index
    this.updateIndex(newIndex)

  }

  onEnded(){
    this.playing = false
    if (this.currentMode.type === "single"){
      this.loop()
    } else{
      this.onNext(this.currentIndex + 1)

    }
  }

  onCanPlay() {
    this.songReady = true
    this.play()
  }

  onTimeUpdate(e: Event) {
    this.currentTime = (<HTMLAudioElement>e.target).currentTime;

    this.percentage = (this.currentTime / this.duration) * 100;
    const buffered = this.audioEl.buffered;
    if (buffered.length && this.bufferPercent < 100) {
      this.bufferPercent = (buffered.end(0) / this.duration) * 100;
    }

  }

  play() {
    this.audioEl.play()
    this.playing = true
  }

  get picUrl(): string {
    return this.currentSong ? this.currentSong.al.picUrl : '//s4.music.126.net/style/web2/img/default/default_album.jpg'
  }


  //change song
  onChangeSong(song:Song){
    this.updateCurrentIndex(this.playList, song)
  }
}
