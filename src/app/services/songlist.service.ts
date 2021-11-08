
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/internal/operators';
import { Song, SongList } from './data-type/common.types';
import { API_CONFIG } from './services.module';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root'
})
export class SonglistService {

  constructor(
    private http:HttpClient, @Inject(API_CONFIG) private uri:string, 
    private songServe: SongService
    ) { 

    }

  getSongListDetail(id: number): Observable<SongList[]>{
    const params = new HttpParams().set('id',id.toString())
    return this.http.get(this.uri+'playlist/detail',{ params })
    .pipe(map((res:{playlist: SongList[]}) => res.playlist))
    
  }

  playList(id: number): Observable<Song[]> {
    return this.getSongListDetail(id)
    .pipe(pluck('tracks'), switchMap(tracks => this.songServe.getSongList(tracks)));
  }
}
