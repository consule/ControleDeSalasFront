import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SalaModel } from '../model/salaModel';
import { AgendamentosEndSalasModel } from '../model/agendamentosEndSalasModel';

const apiUrl = 'http://localhost:52611/api/Salas';
const apiUrlAgendamentosExistentes = 'http://localhost:52611/api/agendamentos/agendamentosExistentes/'

const httpBody = {
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
        tap(sala => console.log('leu os sala')),
        catchError(this.handleError('getSala', []))
      );
  }
  getAgendamentosExistentes(idSala, dataHoraInicial, dataHoraFinal): Observable<AgendamentosEndSalasModel[]> {
    return this.http.get<AgendamentosEndSalasModel[]>(apiUrlAgendamentosExistentes + `${idSala}/${dataHoraInicial}/${dataHoraFinal}`)
      .pipe(
        tap(sala => console.log()),
        catchError(this.handleError('', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
