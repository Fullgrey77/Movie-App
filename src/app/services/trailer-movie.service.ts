import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Results} from '../models/trailer';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrailerMovieService {
  base_path = 'https://api.themoviedb.org/3/movie/'
  path_default = '?api_key=426948fa8804e29d1cc6efc51b22f1b5';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private apiService: HttpClient) {
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('Impossible de récupérer les données', error.error.message);
    } else {
      console.log('Returning body code , ${error.error}');
    }
    return throwError('Something went wrong');
  }

  getTrailers(movie_id: number): Observable<Results> {
    return this.apiService.get<Results>(this.base_path + movie_id + '/videos' + this.path_default)
        .pipe(retry(2), catchError(this.handleError));
  }
}
