import { Song } from "../services/data-type/common.types";


export function inArray(arr: any[], target: any): boolean{
    return arr.indexOf(target) !== -1

}

export function shuffle<T>(arr:T[]):T[] {
    const result = arr.slice()
    for (let i =0; i< result.length; i++){
        //pick random between 0 and i
        const j = getRandomInt([0,i]);
        [result[i],result[j]] = [result[j],result[i]]

    }
    return result
    
}

export function getRandomInt(range:[number, number]):number {
    return Math.floor(Math.random() * (range[1]-range[0]+1) + range[0] )
    
}

export function findIndex(list:Song[], currentSong:Song): number{
    return list.findIndex(item => item.id === currentSong.id)

}