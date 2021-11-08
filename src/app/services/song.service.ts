
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Song, SongList, SongUrl } from './data-type/common.types';
import { API_CONFIG } from './services.module';


@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http:HttpClient, @Inject(API_CONFIG) private uri:string) { }

  getSongUrl(ids: string): Observable<SongUrl[]>{
    const params = new HttpParams().set('id',ids)
    return this.http.get(this.uri+'song/url',{ params })
    .pipe(map((res:{data: SongUrl[]}) => res.data))
    
  }

  getSongList(songs:any): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(item => item.id).join(',');
    return this.getSongUrl(ids).pipe(map(urls => this.generateSongList(songArr, urls)));
  }

    

  generateSongList(songs: Song[], urls: SongUrl[]): Song[]{
    const result = []
    songs.forEach(song =>{
      const url = urls.find(url=>url.id === song.id).url
      if(url){
        result.push({...song,url});
      }
    })
    return result
  }

}
