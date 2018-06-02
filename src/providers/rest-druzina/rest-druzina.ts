import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {LovskaDruzina} from "../../model/lovskaDruzina";
import {catchError} from "rxjs/operators";
import {Clan} from "../../model/clan";

/*
  Generated class for the RestDruzinaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestDruzinaProvider {

  private domena =  "https://desolate-taiga-97058.herokuapp.com/";
  private druzinaUrl = this.domena + 'lovske_druzine';


  constructor(public http: HttpClient) {
    console.log('Hello RestDruzinaProvider Provider');
  }

  getDruzine<data>(): Observable<LovskaDruzina[]>{
    return this.http.get<LovskaDruzina[]>(this.druzinaUrl)
        .pipe(
            catchError(this.handleError<any>(`getLovskeDruzine`, []))
        )
  }
    getLovskaDruzinaById<Data>(id: number): Observable<LovskaDruzina[]> {
        const url = `${this.druzinaUrl}/${id}`;
        return this.http.get<LovskaDruzina[]>(url)
            .pipe(
                catchError(this.handleError('getLovskaDruzinaById',[])));
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
