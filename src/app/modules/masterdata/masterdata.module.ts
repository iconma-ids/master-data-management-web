import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterdataRoutingModule } from './masterdata-routing.module';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    MasterdataRoutingModule,SharedModule
  ]
})
export class MasterdataModule { }
