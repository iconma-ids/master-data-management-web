import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataModelRoutingModule } from './data-model-routing.module';
import { TableComponent } from './table/table.component';
import { ColumnComponent } from './column/column.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    TableComponent,
    ColumnComponent
  ],
  imports: [
    CommonModule,
    DataModelRoutingModule,SharedModule
  ]
})
export class DataModelModule { }
