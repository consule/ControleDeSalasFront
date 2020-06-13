import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { AgendamentosEndSalasModel } from '../model/agendamentosEndSalasModel';

const apiUrl = 'http://localhost:52611/api/AgendamentosEndSalas';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AgendamentosEndSalasService {

  constructor(private http: HttpClient) { }

  getAgendamentosEndSalas(): Observable<AgendamentosEndSalasModel[]> {
    return this.http.get<AgendamentosEndSalasModel[]>(apiUrl)
      .pipe(
        tap(sala => console.log('leu os AgendamentosEndSalasModel')),
        catchError(this.handleError('getAgendamentosEndSalas', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
