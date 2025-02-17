import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IColumnConfiguration } from '../../shared/shared/column-configuration.model';
import { createRequestOption } from '../../shared/util/create-util';



type EntityResponseType = HttpResponse<IColumnConfiguration>;
type EntityArrayResponseType = HttpResponse<IColumnConfiguration[]>;

@Injectable({ providedIn: 'root' })

export class ColumnConfigurationService {

  public resourceUrl ='api/configuration-admin/setting';

  constructor(protected http: HttpClient) {}

  create(columnConfiguration: IColumnConfiguration): Observable<EntityResponseType> {
    return this.http
      .post<IColumnConfiguration>(this.resourceUrl, columnConfiguration, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  update(columnConfiguration: IColumnConfiguration): Observable<EntityResponseType> {
    return this.http
      .put<IColumnConfiguration>(this.resourceUrl, columnConfiguration, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }


  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IColumnConfiguration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  query(req?: any): Observable<EntityArrayResponseType> {debugger;
    const options = createRequestOption(req);
    return this.http
      .get<IColumnConfiguration[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  uploadFiles(selectedFiles: FormData,): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(selectedFiles);

    return this.http
      .post(`${this.resourceUrl}/data/import`, selectedFiles, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }
  deleteAllConfigurations(deleteItems: any[]): Observable<EntityResponseType> {
    return this.http
      .post<any>(
        this.resourceUrl + "/item/list",
        deleteItems,
        { observe: "response" }
      )
      .pipe(map((res: EntityResponseType) => res));
  }

  getSchemaNameList(): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(this.resourceUrl + '/schemaName/list', { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  getTableNamesBySchema(schemaName: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(this.resourceUrl + "/tableName/list"+"/"+schemaName, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  getColumnNamesByTable(schemaName: any, tableName: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(this.resourceUrl + "/columnName/list"+"/"+schemaName+"/"+tableName, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  getDataTypeList(): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(this.resourceUrl + '/dataType/list', { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  getApplicationList(): Observable<EntityArrayResponseType> {debugger;
    return this.http
      .get<any[]>(this.resourceUrl + '/application/list', { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  getClientNameList(): Observable<EntityArrayResponseType> {debugger;
    return this.http
      .get<any[]>(this.resourceUrl + '/clientname/list', { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  getUiList(): Observable<EntityArrayResponseType> {debugger;
    return this.http
      .get<any[]>(this.resourceUrl + '/ui/list', { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  findDataByClientNameAndAppNameAndUi(clientName: any, appName:any,ui: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(this.resourceUrl + '/list'+"/"+clientName+"/"+appName+"/"+ui, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }

  getValuesByColumn(foreignSchema: any, foreignTable: any, foreignColumn: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(this.resourceUrl + "/column/values"+"/"+foreignSchema+"/"+foreignTable+"/"+foreignColumn, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
  getUiListByAppName(appName: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(this.resourceUrl + '/ui/list'+"/"+appName, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => res));
  }
}