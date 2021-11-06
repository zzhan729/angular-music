import { NgModule } from '@angular/core';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import { PlayCountPipe } from '../play-count.pipe';
import { MusicPlayerModule } from './music-player/music-player.module';


@NgModule({
  declarations: [SingleSheetComponent,PlayCountPipe],
  imports: [MusicPlayerModule],
  exports:[SingleSheetComponent, PlayCountPipe, MusicPlayerModule]
})
export class MusicUiModule { }
