import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Song } from 'src/app/services/data-type/common.types';
import { AppStoreModule } from 'src/app/store';
import { SetCurrentIndex } from 'src/app/store/actions/player.actions';
import { getCurrentIndex, getCurrentSong, getPlayer, getPlayList, getPlayMode, getSongList } from 'src/app/store/selectors/player.selector';
import { PlayMode } from './player-type';

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
  songList: [];
  playList: [];
  currentIndex: number;

  //current song data
  currentSong: Song
  duration: number
  currentTime: number

  //play status
  playing = false

  //song status
  songReady = false



  @ViewChild('audio', { static: true }) private audio: ElementRef
  private audioEl: HTMLAudioElement

  constructor(
    private store$: Store<AppStoreModule>
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
    console.log("mode: ", mode);
  }

  private watchCurrentSong(song: Song) {
    if (song) {
      this.currentSong = song;
      this.duration = song.dt / 1000
    } else {
      this.duration = 0;
    }
    console.log("song: ", song);
  }


  onPercentageChange(per) {
    this.audioEl.currentTime = this.duration * (per / 100)

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
    const newIndex = index < 0 ? this.playList.length - 1 : index
    this.updateIndex(newIndex)
  }
  //next song
  onNext(index: number) {
    if (!this.songReady) {
      return
    }
    const newIndex = index >= this.playList.length ? 0 : index
    this.updateIndex(newIndex)

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


}
