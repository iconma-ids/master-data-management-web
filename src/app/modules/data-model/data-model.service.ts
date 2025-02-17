import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {
 
  // public resourceUrl = "http://localhost:8084/api";

  //  //public userResourceUrl= 'api/user-service';

  //  constructor(private http: HttpClient) {}

  // getMasterManagementTableListAll(userId: number, ui: string, appName: string, clientName: any, tableName: string, schemaName: any, limit: any, offset: any) {
  //   return this.http
  //   .get<any>(this.resourceUrl+'/users/list'+"/"+userId +"/"+ui +"/"+appName+"/"+clientName+"/"+tableName+"/"+schemaName+"/"+limit+"/"+offset, { observe: 'response' })
  //   .pipe(map((res:any)=>res)); 
  // }
}
