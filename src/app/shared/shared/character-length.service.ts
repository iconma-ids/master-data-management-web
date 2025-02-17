import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ICharacterLength } from '../model/character-length.model';


type EntityResponseType = HttpResponse<ICharacterLength>;
type EntityArrayResponseType = HttpResponse<ICharacterLength[]>;

@Injectable({ providedIn: 'root' })

export class CharacterLengthService {

  public resourceUrl ='api/configuration-admin/character/length';

  constructor(protected http: HttpClient) {}

  create(characterLength: ICharacterLength): Observable<EntityResponseType> {
    return this.http
      .post<ICharacterLength>(this.resourceUrl, characterLength, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }

//   update(product: IProduct): Observable<EntityResponseType> {
//     return this.http
//       .put<IProduct>(this.resourceUrl, product, { observe: 'response' })
//       .pipe(map((res: EntityResponseType) => res));
//   }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICharacterLength>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => res));
  }
}