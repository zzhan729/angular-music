import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SongList } from 'src/app/services/data-type/common.types';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSheetComponent implements OnInit {
  @Input() list:SongList;
  @Output() onPlay = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  playList(id:number){
    this.onPlay.emit(id)
  }

}
