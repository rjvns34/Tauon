import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { RootComponent } from './dashboard/root/root.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './modules/user/login/login.component';
import { UserTotalInfoComponent } from './modules/user/user-total-info/user-total-info.component';
import { UsersDataComponent } from './modules/user/users-data/users-data.component';

const routes: Routes = [
  // {path:'',component:LoginComponent,children:[
  //   // {path:'dashboard',component:RootComponent}
  // ]}
  {path:'',component: LoginComponent},
  {path:'dashboard',component:RootComponent,canActivate:[AuthGuard], children:[
    {path:'', component: HomeComponent},
    {path:'userInfo', component: UsersDataComponent},
    {path:'userTotalInfo', component: UserTotalInfoComponent},
    // {path:'setting', component: SettingsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
