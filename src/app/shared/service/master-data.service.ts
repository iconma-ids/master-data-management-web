import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({ providedIn: 'root' })
export class MasterDataService {
  public resourceUrl = 'api/configuration-admin/master';

  constructor(protected http: HttpClient) {}

  getMasterData(): Observable<any> {
    return this.http
      .get<any>(
        this.resourceUrl + '/data',

        { observe: 'response' }
      )
      .pipe(map((res: any) => res));
  }
}
