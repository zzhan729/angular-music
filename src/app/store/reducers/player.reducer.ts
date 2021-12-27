import { Action, createReducer, on } from "@ngrx/store";
import { Song } from "src/app/services/data-type/common.types";
import { PlayMode } from "src/app/share/music-ui/music-player/player-type";
import { SetCurrentAction, SetCurrentIndex, SetPlaying, SetPlayList, SetPlayMode, SetSongList } from "../actions/player.actions";

export enum CurrentActions {
    Add,
    Play,
    Delete,
    Clear,
    Other
  }

export type PlayState = {
    // Play status
    playing: boolean;

    // Mode
    playMode: PlayMode;

    //SongList
    songList: Song[];

    //playList
    playList: Song[];

    //Current Play Index
    currentIndex: number;

    currentAction: CurrentActions;

}

export const initialStates: PlayState = {
    playing: false,
    songList: [],
    playList: [],
    playMode: {type:'loop', label:'Loop'},
    currentIndex: -1,
    currentAction: CurrentActions.Other
}

const reducer = createReducer(
    initialStates, 
    on(SetPlaying, (state, { playing }) => ({ ...state, playing })),
    on(SetPlayList, (state, { playList }) => ({ ...state,  playList })),
    on(SetSongList, (state, { songList }) => ({ ...state,  songList })),
    on(SetPlayMode, (state, { playMode }) => ({ ...state,  playMode })),
    on(SetCurrentIndex, (state, { currentIndex }) => ({ ...state,  currentIndex })),
    on(SetCurrentAction, (state, { currentAction }) => ({ ...state,  currentAction }))
    
    )

export function playerReducer(state: PlayState, action:Action){
    return reducer(state,action)
}
