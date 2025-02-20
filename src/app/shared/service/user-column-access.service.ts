import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IUserColumnAccess } from '../model/user-column-access.model';


type EntityResponseType = HttpResponse<IUserColumnAccess>;
type EntityArrayResponseType = HttpResponse<IUserColumnAccess[]>;

@Injectable({ providedIn: 'root' })

export class UserColumnAccessService {

  public resourceUrl ='api/dms/user/column/access';

  constructor(protected http: HttpClient) {}

  saveUserColumnAccessData(userColumnAccessModel: any) {
    return this.http
      .post<any>(
        this.resourceUrl ,
        userColumnAccessModel,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => res));
  }

  getUserColumnAccessData(moduleName: any, appName: any, userId: any): Observable<any> {
    return this.http
      .get<any>(this.resourceUrl +'/'+ moduleName +'/'+ appName +'/'+ userId + '/data',  { observe: 'response' })
      .pipe(map((res: any) => res));
   
  }
  updateUserColumnAccessData(userColumnAccessModel: any) {
    return this.http
      .put<any>(
        this.resourceUrl ,
        userColumnAccessModel,
        { observe: 'response' }
      )
      .pipe(map((res: EntityResponseType) => res));
  }
}