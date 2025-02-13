import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FiltersComponent } from './filters/filters.component';


@NgModule({
  declarations: [
    FiltersComponent,FiltersComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[FiltersComponent]
})
export class SharedModule { }
