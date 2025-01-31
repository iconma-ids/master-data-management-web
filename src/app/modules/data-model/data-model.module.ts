import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataModelRoutingModule } from './data-model-routing.module';
import { TableComponent } from './table/table.component';
import { ColumnComponent } from './column/column.component';


@NgModule({
  declarations: [
    TableComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule,
    DataModelRoutingModule
  ]
})
export class DataModelModule { }
