import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  }, 
  {
    path: 'data-model',
    loadChildren: () =>
      import('./modules/data-model/data-model.module').then((m) => m.DataModelModule),
  }, 
  {
    path: 'workflow',
    loadChildren: () =>
      import('./modules/workflow/workflow.module').then((m) => m.WorkflowModule),
  }, 
  {
    path: 'file-explorer',
    loadChildren: () =>
      import('./modules/files/files.module').then((m) => m.FilesModule),
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
