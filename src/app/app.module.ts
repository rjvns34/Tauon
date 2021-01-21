import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { UserModule } from './modules/user/user.module';
import { NodeModule } from './modules/node/node.module';
import { InstallationModule } from './modules/installation/installation.module';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RootComponent } from './dashboard/root/root.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './dashboard/home/home.component';
import { UsersDataComponent } from './modules/user/users-data/users-data.component';
import { AlertComponent } from './modules/alert/alert.component';
import { UserTotalInfoComponent } from './modules/user/user-total-info/user-total-info.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RootComponent,
    SidebarComponent,
    HomeComponent,
    UsersDataComponent,
    AlertComponent,
    UserTotalInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    UserModule,
    NodeModule,
    InstallationModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
