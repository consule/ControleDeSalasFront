import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SalaModel } from '../model/salaModel';
import { AgendamentosEndSalasModel } from '../model/agendamentosEndSalasModel';

const apiUrl = 'http://localhost:52611/api/Salas';
const apiUrlAgendamentosExistentes = 'http://localhost:52611/api/agendamentos/agendamentosExistentes'

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
        tap(sala => console.log('leu os sala')),
        catchError(this.handleError('getSala', []))
      );
  }
  getAgendamentosExistentes(idSala, dataHoraInicial, dataHoraFinal): Observable<AgendamentosEndSalasModel[]> {
    //   const httpBody = {
    //     headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //     body: {
    //         codigoGrupoTipoAuxiliar,
    //         codigoCargaHoraria
    //     }
    //   }
    // return this.http.delete<any>(`${this.UrlService}/cargaHorariaGrupoTipoAuxiliar`, httpBody)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('salaId', idSala);
    // let params = new URLSearchParams();
    // params.append("idSala", idSala);
    // params.append("idSala", idSala);
    // params.append("idSala", idSala);
    let params = new HttpParams().set("idSala", idSala).set("dataHoraInicial", dataHoraInicial).set("dataHoraFinal", dataHoraFinal); //Create new HttpParams


    // const httpBody = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //   body:
    //   {
    //     idSala, dataHoraInicial, dataHoraFinal
    //   }

    // }
    // map(x => httpBody {

    // })
    //   const criteria = [ {idSala: 1}, {b: 23} ];
    //const criteria = encodeURIComponent( JSON.stringify(httpBody.body));

    console.log(params)
    return this.http.get<AgendamentosEndSalasModel[]>(apiUrlAgendamentosExistentes, { params })
      .pipe(
        tap(sala => console.log('leu os agendamentos existentes')),
        catchError(this.handleError('getAgendamentosExistentes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
