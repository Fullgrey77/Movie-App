import {Injectable} from '@angular/core';
import {Results} from '../models/movie';
import {from, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Genres} from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  base_path = 'https://api.themoviedb.org/3/genre/movie/list?api_key=426948fa8804e29d1cc6efc51b22f1b5';
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

  getGenres(): Observable<Genres> {
    return this.apiService.get<Genres>(this.base_path).pipe(retry(2), catchError(this.handleError));
  }
}
