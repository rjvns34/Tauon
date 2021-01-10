import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallationRoutingModule } from './installation-routing.module';
import { InstallationComponent } from './installation/installation.component';


@NgModule({
  declarations: [InstallationComponent],
  imports: [
    CommonModule,
    InstallationRoutingModule
  ]
})
export class InstallationModule { }
