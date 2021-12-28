import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { map } from 'rxjs/internal/operators';
import { Banner, HotTag, Singer, SongList } from 'src/app/services/data-type/common.types';
import { SonglistService } from 'src/app/services/songlist.service';
import { AppStoreModule } from 'src/app/store';
import { SetCurrentIndex, SetPlayList, SetSongList } from 'src/app/store/actions/player.actions';
import { PlayState } from 'src/app/store/reducers/player.reducer';
import { getPlayer, getPlayMode } from 'src/app/store/selectors/player.selector';
import { findIndex, shuffle } from 'src/app/utils/array';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[];
  hottags: HotTag[];
  songlist: SongList[];
  singers: Singer[];

  private playerState:PlayState;

  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel: NzCarouselComponent;
  constructor(
    private route: ActivatedRoute,
    private SonglistServe: SonglistService,
    private store$: Store<AppStoreModule>,
  ){
      this.route.data.pipe(map(res => res.homeDatas)).subscribe(([banners, hotTags, songlist, singers]) => {
      this.banners = banners;
      this.hottags = hotTags;
      this.songlist = songlist;
      this.singers = singers;
  });
    this.store$.pipe(select(getPlayer)).subscribe(res=>this.playerState = res)
  
  }

 


  ngOnInit(): void {

  }

  onBeforeChange({ to }) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }

  onPlayList(id: number){
    console.log("id:", id);
    this.SonglistServe.playList(id).subscribe(list => {
      this.store$.dispatch(SetSongList( { songList: list }));
    
      let trueIndex = 0;
      let trueList = list.slice();
      
      if(this.playerState.playMode.type === "random"){
        trueList = shuffle(list || [])
        trueIndex = findIndex(trueList,list[trueIndex])

      }
      this.store$.dispatch(SetPlayList( { playList: trueList }));
      this.store$.dispatch(SetCurrentIndex( { currentIndex: trueIndex }));
      
    });
  
  }


}
