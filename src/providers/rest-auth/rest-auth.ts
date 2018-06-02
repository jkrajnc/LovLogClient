import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import { Clan} from "../../model/clan";
import {catchError} from "rxjs/operators";
import {Form} from "../../model/form";

/*
  Generated class for the RestAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestAuthProvider {

  private domena = 'https://desolate-taiga-97058.herokuapp.com/';

  constructor(public http: HttpClient) {
    console.log('Hello RestAuthProvider Provider');
  }

  signIn(form: Form): Observable<Clan>{
    const url = this.domena + 'signin';
    return this.http.post<any>(url, form)
        .pipe(catchError(this.handleError('signin')));
  }

  signUp(clan: Clan): Observable<Clan>{
    const url = this.domena + 'signup';
    return this.http.post<Clan>(url, clan)
        .pipe(catchError(this.handleError('signup', clan)));
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
