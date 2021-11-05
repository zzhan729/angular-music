import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SongList } from 'src/app/services/data-type/common.types';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSheetComponent implements OnInit {
  @Input() list:SongList;
  constructor() { }

  ngOnInit(): void {
  }

}
