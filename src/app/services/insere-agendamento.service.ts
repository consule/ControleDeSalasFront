import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { insereAgendamentoModel } from '../model/insereAgendamentoModel';

const apiUrl = 'http://localhost:52611/api/Agendamentos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InsereAgendamentoService {

  constructor(private http: HttpClient) { }

  insereAgendamentoDeSala(agendamento): Observable<insereAgendamentoModel[]> {

    console.log(agendamento);
    // return;
    return this.http.post<insereAgendamentoModel[]>(apiUrl, agendamento, httpOptions)
      .pipe(
        tap(agendamento => console.log('agendamento')),
        catchError(this.handleError('insereAgendamentoDeSala', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
