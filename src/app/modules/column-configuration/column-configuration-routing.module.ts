import { HttpResponse } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterModule, Routes } from '@angular/router';
import { EMPTY, flatMap, Observable, of } from 'rxjs';
import { ColumnConfigurationService } from './column-configuration.service';
import { ListComponent } from './list/list.component';
import { IColumnConfiguration, ColumnConfiguration } from '../../shared/shared/column-configuration.model';
import { CreateComponent } from './create/create.component';
@Injectable({ providedIn: 'root' })
export class ColumnConfigurationResolve implements Resolve<IColumnConfiguration> {
  constructor(private service: ColumnConfigurationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IColumnConfiguration> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((company: HttpResponse<IColumnConfiguration>) => {
          if (company.body) {
            return of(company.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ColumnConfiguration());
  }
}
const routes: Routes = [
  {
    path: '',
    component: ListComponent,
   data: {
      pageTitle: 'Configuration',
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'new',
    component: CreateComponent,
    // data: {
    //   pageTitle: 'Column Configuaration',
    // },
  },
  // {
  //   path: ':appName/:clientName/:tableName/:id/view',
  //   component: ViewComponent,
  //   resolve: {
  //         columnConfiguration:ColumnConfigurationResolve,
  //       },
        
  //       data: {
  //                     pageTitle: 'Column Configuration',
  //                     defaultSort: 'id,asc',
  //       },
  // },
  // {
  //   path: ':appName/:clientName/:tableName/:id/edit',
  //   component: CreateComponent,
  //   resolve: {
  //     columnConfiguration: ColumnConfigurationResolve,
  //   },
  // },
  // {
  //   path: '',
  //   component: ListComponent,
  //   data: {
  //     pageTitle: 'Configuration',
  //     defaultSort: 'id,asc',
  //   },
  // },
  // {
  //   path: ':id/view',
  //   component: ViewComponent,
  //   resolve: {
  //     columnConfiguration:ColumnConfigurationResolve,
  //   },
    
  //   data: {
  //                 pageTitle: 'Column Configuration',
  //                 defaultSort: 'id,asc',
  //   },
  
  // },
  // {
  //   path: 'new',
  //   component: CreateComponent,
  //   data: {
  //     pageTitle: 'Column Configuaration',
  //   },
  // },
  // {
  //   path: ':id/edit',
  //   component: CreateComponent,
  //   resolve: {
  //     columnConfiguration: ColumnConfigurationResolve,
  //   },
  //   }
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColumnConfigurationRoutingModule { }
