import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodeRoutingModule } from './node-routing.module';
import { NodeComponent } from './node/node.component';


@NgModule({
  declarations: [NodeComponent],
  imports: [
    CommonModule,
    NodeRoutingModule
  ]
})
export class NodeModule { }
