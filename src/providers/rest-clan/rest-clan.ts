import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable"
import {Clan} from "../../model/clan";
import {Porocilo} from "../../model/porocilo";
import {Aktivnost} from "../../model/aktivnost";
import {catchError} from "rxjs/operators";
import { of } from 'rxjs/observable/of';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class RestClan {

  private domena = 'https://desolate-taiga-97058.herokuapp.com/';
  private claniUrl = this.domena + 'clani';


  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  //ČLANI
  getClani(): Observable<Clan[]> {
    return this.http.get<Clan[]>(this.claniUrl)
      .pipe(
        catchError(this.handleError('getClani',[])));
  }

  getClan<Data>(id: number): Observable<Clan>{
    const url = `${this.claniUrl}/${id}`;
    return this.http.get<Clan>(url)
      .pipe(
        catchError(this.handleError<any>(`getClan id=${id}`))
      )
  }

  getClaniByIdLovskaDruzina<Data>(id: number): Observable<Clan[]> {
    const url = `${this.claniUrl}/lovske_druzine/${id}`;
    return this.http.get<Clan[]>(url)
      .pipe(
        catchError(this.handleError('getClani',[])));
  }


  addClan(clan: Clan): Observable<Clan>{
    return this.http.post<any>(this.claniUrl, clan);
  }

  updateClan(clan:Clan): Observable<Clan>{
    return this.http.put<any>(this.claniUrl, clan);
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
