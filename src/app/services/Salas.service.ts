import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SalaModel } from '../model/salaModel';

const apiUrl = 'http://localhost:52611/api/Salas';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  constructor(private http: HttpClient) { }

  getSala(): Observable<SalaModel[]> {
    return this.http.get<SalaModel[]>(apiUrl)
      .pipe(
        tap(sala => console.log('leu os produtos')),
        catchError(this.handleError('getSala', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}