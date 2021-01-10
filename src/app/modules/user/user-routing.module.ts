import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from 'src/app/dashboard/root/root.component';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',children:[
      { path:'dashboard', component:RootComponent , canActivate:[AuthGuard]},
      // { path:'login', component:LoginComponent, canActivate:[AuthGuard] }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
