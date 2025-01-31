import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';

const routes: Routes = [
  {
        path: '',
        component: FileExplorerComponent,
        data: {
        },
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule { }
