import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {Clan} from "../../model/clan";
import {of} from "rxjs/observable/of";
import{Porocilo} from "../../model/porocilo";

/*
  Generated class for the RestPorociloProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestPorociloProvider {

  private domena = 'https://desolate-taiga-97058.herokuapp.com/';
  private porocilaUrl = this.domena + 'porocila';


  constructor(public http: HttpClient) {
    console.log('Hello RestPorociloProvider Provider');
  }

  //Poročila
  getPorocilaByIdClan(id: number): Observable<Porocilo[]> {
    const url = `${this.porocilaUrl}/clani/${id}`;
    return this.http.get<Porocilo[]>(url)
      .pipe(
        catchError(this.handleError('getPorocila',[])));
  }

  getPorocilo<Data>(id: number): Observable<Porocilo>{
    const url = `${this.porocilaUrl}/${id}`;
    return this.http.get<Porocilo>(url)
      .pipe(
        catchError(this.handleError<any>(`getPorocilo id=${id}`))
      )
  }

  savePorocilo(porocilo: Porocilo): Observable<Porocilo>{
    return this.http.post<Porocilo>(this.porocilaUrl, porocilo)
      .pipe(catchError(this.handleError('porocilo', porocilo)));
  }

  updatePorocilo(porocilo: Porocilo): Observable<Porocilo>{
    return this.http.put<any>(this.porocilaUrl, porocilo);
  }

  deletePorocilo(id: number): Observable<Porocilo>{
    const url = `${this.porocilaUrl}/${id}`;
    return this.http.delete<any>(url);
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
