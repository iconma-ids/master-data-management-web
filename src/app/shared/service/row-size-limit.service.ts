import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { createRequestOption } from 'src/app/shared/util/create-util';

type EntityResponseType = HttpResponse<IRowSizeLimit>;
type EntityArrayResponseType = HttpResponse<IRowSizeLimit[]>;
//
@Injectable({ providedIn: 'root' })
export class RowSizeLimitService {
  public resourceUrl = 'api/configuration-admin/row/size/limit';

  constructor(protected http: HttpClient) {}

  create(rowSizeLimit: IRowSizeLimit): Observable<EntityResponseType> {
    return this.http
      .post<IRowSizeLimit>(this.resourceUrl, rowSizeLimit, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  update(rowSizeLimit: IRowSizeLimit): Observable<EntityResponseType> {
    return this.http
      .put<IRowSizeLimit>(this.resourceUrl, rowSizeLimit, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRowSizeLimit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRowSizeLimit[]>(this.resourceUrl, { params: options, observe: 'response' })
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

}
