import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';


@NgModule({
  declarations: [
    FileExplorerComponent
  ],
  imports: [
    CommonModule,
    FilesRoutingModule,
  ]
})
export class FilesModule { }
