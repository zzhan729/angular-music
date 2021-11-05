import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from '../pages/pages.module';
import { ServicesModule } from '../services/services.module';
import { ShareModule } from '../share/share.module';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

registerLocaleData(en);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
    ServicesModule,
    ShareModule,
    AppRoutingModule,
  ],
  exports:[
    ShareModule,
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class CoreModule { 
  constructor(@SkipSelf() @Optional() parentModule: CoreModule){
    if (parentModule){
      throw new Error('CoreModule can only be imported by appModule.')
    }

  }
}
