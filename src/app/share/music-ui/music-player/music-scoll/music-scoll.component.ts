import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, AfterViewInit, ElementRef, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(MouseWheel);
BScroll.use(ScrollBar);

@Component({
  selector: 'app-music-scoll',
  template: `
    <div class="music-scoll" #wrap>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `.music-scoll{width: 100%; height:100%; overflow: hidden;}`
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicScollComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data:any[];
  @Input() refreshDelay = 50;
  private bs: BScroll

  @Output() private onScrollEnd = new EventEmitter<number>();
  
  @ViewChild('wrap',{static: true}) private wrapRef: ElementRef

  
  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {  
    this.bs = new BScroll(this.wrapRef.nativeElement, {
      scrollbar: {
        interactive: true
      },
      mouseWheel: {}
   });
   this.bs.on('scrollEnd', ({ y }) => this.onScrollEnd.emit(y));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']){
      this.refreshScroll();
    }
  }

  private refresh() {
    
    this.bs.refresh()
  }

  refreshScroll(){
    setTimeout(() => {
      this.refresh()},
      this.refreshDelay);

  }

  scrollToElement(...args) {
    this.bs.scrollToElement.apply(this.bs, args);
  }
  scrollTo(...args) {
    this.bs.scrollTo.apply(this.bs, args);
  }


}


