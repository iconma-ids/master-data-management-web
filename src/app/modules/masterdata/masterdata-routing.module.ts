import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
    {
          path: '',
          component: ProductComponent,
          data: {
          },
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterdataRoutingModule { }
