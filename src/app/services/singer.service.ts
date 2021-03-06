import { HttpClient,  } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Singer, Song } from './data-type/common.types';
import { API_CONFIG, ServicesModule } from './services.module';
import { map } from 'rxjs/internal/operators'



@Injectable({
  providedIn: ServicesModule
})

export class SingerService {
  
  constructor(private http:HttpClient, @Inject(API_CONFIG) private uri:string) { }

  getSinger(): Observable<Singer[]>{
    return this.http.get(this.uri+'top/artists?limit=10')
    .pipe(map((res:{artists: Singer[]}) => res.artists))
    
  }




}
