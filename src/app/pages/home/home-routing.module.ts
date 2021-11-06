import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeResolveService } from './home-resolve.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path:'home', component: HomeComponent, data:{title:"Discovery"}, resolve:{homeDatas: HomeResolveService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [HomeResolveService]
})
export class HomeRoutingModule { }
