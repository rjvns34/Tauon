import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
const Material = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  NgxPaginationModule,
  Ng2SearchPipeModule,
  MatSelectModule,
  MatCheckboxModule,
  MatTabsModule,
  MatTableModule,
  MatSortModule
]

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
