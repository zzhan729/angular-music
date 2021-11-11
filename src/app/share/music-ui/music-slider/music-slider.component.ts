import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getElementOffset } from 'ng-zorro-antd/core/util';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, takeUntil, tap } from 'rxjs/internal/operators';
import { inArray } from 'src/app/utils/array';
import { limitNumberInRange, getPercent } from 'src/app/utils/number';
import { sliderEvent } from './music-slider-helper';
import { SliderEventObserverConfig, SliderValue } from './music-slider-types';

@Component({
  selector: 'app-music-slider',
  templateUrl: './music-slider.component.html',
  styleUrls: ['./music-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MusicSliderComponent),
    multi: true
  }]
})
export class MusicSliderComponent implements OnInit, OnDestroy, ControlValueAccessor {
 
  @Input() musicVertical = false;
  @Input() musicMin = 0;
  @Input() musicMax = 100;
  @Input() bufferOffset: SliderValue = 0

  @Output() musicOnAfterChange = new EventEmitter<SliderValue>()


  private sliderDom: HTMLDivElement;
  @ViewChild('musicSlider', {static: true}) private musicSlider: ElementRef;

  private dragStart$: Observable<number>
  private dragMove$: Observable<number>
  private dragEnd$: Observable<Event>
  private dragStart_: Subscription | null
  private dragMove_: Subscription | null
  private dragEnd_: Subscription | null


  private isDragging = false

  value: SliderValue = null
  offset: SliderValue = null

  constructor(@Inject(DOCUMENT) private doc:Document, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.sliderDom = this.musicSlider.nativeElement;
    this.createDraggingOsbervables();
    this.subscribeDrag(['start']);
  }

  private createDraggingOsbervables(){

    const orientField = this.musicVertical ? 'pageY': "pageX";
    const mouse : SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField]
    };

    const touch: SliderEventObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchemd',
      filter: (e: TouchEvent) => e instanceof TouchEvent,
      pluckKey: ['touches','0', orientField]
    };
    
    [mouse, touch].forEach(source => {

      const { start, end, move, filter: fileFunc, pluckKey } = source;

      source.startPlucked$ = fromEvent(this.sliderDom, start)
      .pipe(filter(fileFunc), 
        tap(sliderEvent),
        pluck(...pluckKey),
        map((position:number) => this.findClosetValue(position))
      );

      source.end$ = fromEvent(this.doc, end);

      source.moveResolved$ = fromEvent(this.doc, move).pipe(
        filter(fileFunc), 
        tap(sliderEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position:number) => this.findClosetValue(position)),
        takeUntil(source.end$)
      );
    });

    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$)
    this.dragMove$ = merge(mouse.moveResolved$, touch.moveResolved$)
    this.dragEnd$ = merge(mouse.end$, touch.end$)

  }

  private subscribeDrag(events: string[] = ['start', 'move', 'end']){
    if(inArray(events, 'start') && this.dragStart$){
      this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this));
    }
    if(inArray(events, 'move') && this.dragMove$){
      this.dragMove_ =this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if(inArray(events, 'end') && this.dragEnd$){
      this.dragEnd_ =this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private unsubscribeDrag(events: string[] = ['start', 'move', 'end']){
    if(inArray(events, 'start') && this.dragStart_){
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }
    if(inArray(events, 'move') && this.dragMove_){
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }
    if(inArray(events, 'end') && this.dragEnd_){
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  private onDragStart(value: number){
    this.toggleDragMoving(true);
    this.setValue(value);
    
  }
  private onDragMove(value: number){
    if (this.isDragging){
      this.setValue(value);
      this.cdr.markForCheck();
    }
  }

  private onDragEnd(){
    this.musicOnAfterChange.emit(this.value)
    this.toggleDragMoving(false);
    this.cdr.markForCheck()

  }

  private setValue(value:SliderValue, needCheck = false){
    if(needCheck){
      if (this.isDragging) return;
      this.value = this.formatrValue(value)
      this.updateTrackAndHandles()
    }
    if(!this.valueEqual(this.value, value))
    {
      this.value = value;
      this.updateTrackAndHandles();
      this.onValueChange(this.value);
    }
  }

  private formatrValue(value:SliderValue):SliderValue {
    let res =value;
    if (!this.assertValueVaild(value)){
      res = this.musicMin
    }else{
      res = limitNumberInRange(value, this.musicMin, this.musicMax)
    }
    return res
  }

  private assertValueVaild(value:SliderValue): boolean {
    return isNaN(typeof value !== 'number' ? parseFloat(value) : value);
  }

  private valueEqual(val1, val2 : SliderValue):boolean{
    if (typeof val1 !== typeof val2){
      return false
    } 
    return val1 === val2
  }

  private updateTrackAndHandles(){
    this.offset = this.getValueToOffest(this.value);
    this.cdr.markForCheck();
  }

  private getValueToOffest(value: SliderValue): SliderValue{
    return getPercent(this.musicMin, this.musicMax, value)
  }

  private toggleDragMoving(moveable: boolean){
    this.isDragging = moveable
    if (moveable){
      this.isDragging = true;
      this.subscribeDrag(['move', 'end']);
    }else{
      this.unsubscribeDrag(['move', 'end']);
    }
  }

  private findClosetValue(postion: number): number {
    // get the total length of the slider
    const sliderLength = this.getSliderLength()
    
    //slider left/top
    const sliderStart = this.getSliderPosition()
    //current position/ total length
    const ratio = limitNumberInRange((postion - sliderStart) / sliderLength, 0 , 1 )
    const rationTrue = this.musicVertical ? 1-ratio : ratio
    return rationTrue * (this.musicMax - this.musicMin) + this.musicMin

  }

  private getSliderLength():number{
    return this.musicVertical ? this.sliderDom.clientHeight : this.sliderDom.clientWidth
  }

  private getSliderPosition():number {
    const offest = getElementOffset(this.sliderDom)
    return this.musicVertical ? offest.top : offest.left
  }


  private onValueChange(value: SliderValue):void{

  }

  private onTouched():void{

  }

  writeValue(value:SliderValue):void{
    this.setValue(value);
  }

  registerOnChange(fn:(value: SliderValue) => void):void{
    this.onValueChange = fn;

  }

  registerOnTouched(fn:() => void):void{
    this.onTouched = fn;

  }


  ngOnDestroy():void{
    this.unsubscribeDrag();
  }

}
