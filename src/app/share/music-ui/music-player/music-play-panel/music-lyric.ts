import { from, zip } from "rxjs";
import { skip } from 'rxjs/internal/operators';
import { Lyric } from "src/app/services/data-type/common.types";



export interface BaseLyricLine{
    txt: string,
    txtCn: string,
}

interface LyricLine extends BaseLyricLine {
    time: number
}

const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/


export class musicLyric {
    private lrc: Lyric;
    private playing: boolean = false;
    realLine: LyricLine[] = [];

    private currentNum:number;

    constructor(lrc: Lyric) {
        this.lrc = lrc;
        this.init();
    }

    private init() {
        if (this.lrc.tlyric) {
            this.generTlyric()
        } else {
            this.generLyric();
        }
    }

    private generLyric() {
        const lines = this.lrc.lyric.split('\n');
        lines.forEach(line => this.makeLine(line));
        
        


    }


    private generTlyric() {
        const lines = this.lrc.lyric.split('\n');
        const tlines = this.lrc.tlyric.split('\n').filter(item => timeExp.exec(item) !== null);
        const morelines = lines.length - tlines.length        
        let tempArray = [];
        if (morelines >=0){
            tempArray = [lines, tlines];
        }else{
            tempArray = [tlines,lines]
        }
        const firstLine = timeExp.exec(tempArray[1][0])[0]
        console.log("firstLine: ",firstLine);

        const skipIndex = tempArray[0].findIndex(item =>{
            const exec = timeExp.exec(item);
            if(exec){
                return exec[0] === firstLine;
            }
        });
        
        const _skip = skipIndex === -1 ? 0 : skipIndex;
        const skipItems = tempArray[0].slice(0, _skip);
        if (skipItems.length) {
          skipItems.forEach(line => this.makeLine(line));
        }
    
        let zipLines$;
        if (morelines > 0) {
          zipLines$ = zip(from(lines).pipe(skip(_skip)), from(tlines));
        } else {
          zipLines$ = zip(from(lines), from(tlines).pipe(skip(_skip)));
        }
        zipLines$.subscribe(([line, tline]) => this.makeLine(line, tline));
    }

    private makeLine(line: string,tline = " ") {
        const result = timeExp.exec(line);
        if(result){
            const txt = line.replace(timeExp, '').trim();
            const txtCn = tline ? tline.replace(timeExp,'').trim() : '';
            if(txt){
                let thirdResult = result[3] || '00';
                const len = thirdResult.length;
                const _thirdResult = len > 2 ? parseInt(thirdResult) : parseInt(thirdResult) * 10
                let time = Number(result[1]) * 60 * 1000+ Number(result[2])*1000 + _thirdResult;
                this.realLine.push({txt, txtCn, time})
            }
        }
        
    }

    play(startTime = 0){
        if (!this.realLine.length) return
        if (!this.playing) {
            this.playing = true;
        }

        this.currentNum = this.findCurrentNum(startTime)
        console.log('currentNum: ',this.currentNum);
        this.startStamp = Date.now() - startTime

    }

    private findCurrentNum(time:number):number{
        const index = this.realLine.findIndex(item => time <= item.time)
        return index === -1 ? this.realLine.length-1 : index;

    }
}
