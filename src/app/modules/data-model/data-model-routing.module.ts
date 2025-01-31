import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ColumnComponent } from './column/column.component';

const routes: Routes = [
  {
      path: '',
      component: TableComponent,
      data: {
      },
  },
  {
    path: 'column',
    component: ColumnComponent,
    data: {
    },
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataModelRoutingModule { }
