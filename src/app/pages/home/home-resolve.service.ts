import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Banner, HotTag, Singer, SongList } from 'src/app/services/data-type/common.types';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/internal/operators';
type HomeDataType = [Banner[], HotTag[], SongList[], Singer[]];

@Injectable({
  providedIn: 'root'
})

export class HomeResolveService implements Resolve<HomeDataType> {

  constructor(
    private homeServe: HomeService, 
    private singerServe: SingerService
  ) { }

  resolve(): Observable<HomeDataType>{

    return forkJoin([
      this.homeServe.getBanners(),
      this.homeServe.getHotTags(),
      this.homeServe.getPersonalSheetList(),
      this.singerServe.getSinger()
    ]).pipe(first());
  }
}
