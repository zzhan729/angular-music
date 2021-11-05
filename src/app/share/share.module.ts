import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from '../ng-zorro-antd/ng-zorro-antd.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,

  ],
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ]
})
export class ShareModule { }
