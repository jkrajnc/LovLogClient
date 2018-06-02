import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Porocilo} from "../../model/porocilo";
import {Aktivnost} from "../../model/aktivnost";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";

/*
  Generated class for the RestAktivnostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestAktivnostProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestAktivnostProvider Provider');
  }

  private domena = 'https://desolate-taiga-97058.herokuapp.com/';

  private aktivnostiUrl = this.domena + 'aktivnosti';

  //Poročila
  getAktivnostiByIdPorocila(id: number): Observable<Aktivnost[]> {
    const url = `${this.aktivnostiUrl}/porocila/${id}`;
    return this.http.get<Aktivnost[]>(url)
      .pipe(
        catchError(this.handleError('getPorocila',[])));
  }

  getAktivnost<Data>(id: number): Observable<Aktivnost>{
    const url = `${this.aktivnostiUrl}/${id}`;
    return this.http.get<Aktivnost>(url)
      .pipe(
        catchError(this.handleError<any>(`getPorocilo id=${id}`))
      )
  }

  saveAktivnost(aktivnost: Aktivnost): Observable<Aktivnost>{
    return this.http.post<any>(this.aktivnostiUrl, aktivnost);
  }

  updateAktivnost(aktivnost: Aktivnost): Observable<Aktivnost>{
    return this.http.put<any>(this.aktivnostiUrl, aktivnost);
  }

  deleteAktivnost(id: number): Observable<Aktivnost>{
    const url = `${this.aktivnostiUrl}/${id}`;
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
