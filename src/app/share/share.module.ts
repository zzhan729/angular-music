import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
import { FormsModule } from '@angular/forms';
import { MusicUiModule } from './music-ui/music-ui.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    MusicUiModule

  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    MusicUiModule
  ]
})
export class ShareModule { }
