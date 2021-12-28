


export interface Banner  {
    targetId: number,
    url: string,
    imageUrl: string

}

export interface HotTag  {
    id: number,
    name: string,
    position: number

}

export interface Singer  {
    id: number,
    name: string,
    img1v1Url: string,
    albumSize: number
}

export interface Song {
    id: number,
    name: string,
    url: string,
    ar: Singer[],
    al: { id: number, name:string, picUrl: string}
    dt: number
}

export interface SongList {
    id: number,
    name: string,
    picUrl: string,
    trackCount: number,
    playCount: number,
    tracks: Song[]

}

export interface SongUrl {
    id: number,
    url: string,

}

export interface Lyric {
    lyric: string;
    tlyric: string;
  }