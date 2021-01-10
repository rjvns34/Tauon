import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstallationComponent } from './installation/installation.component';

const routes: Routes = [
  // {
  //   path:'',children:[
  //     { path:'installation',component:InstallationComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstallationRoutingModule { }
