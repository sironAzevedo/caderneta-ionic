import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StatusContaDTO, TipoContaDTO } from '../../models/interfaces';
import { API_CONFIG } from '../config/api.config';
import { ContaDTO } from './../../models/interfaces';

@Injectable()
export class ContaService {
  constructor(public http: HttpClient) {}

  salvarConta(conta: ContaDTO): Observable<any> {
    return this.http.post<any>(`${API_CONFIG.baseUrl}/v1/conta`, conta).pipe(
      tap((res: any) => {
        return res;
      })
    );
  }

  atualizarConta(conta: ContaDTO): Observable<any> {
    return this.http.put<any>(`${API_CONFIG.baseUrl}/v1/conta`, conta).pipe(
      tap((res: any) => {
        return res;
      })
    );
  }

  deletarConta(id: string): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}/v1/conta?conta=${id}`);
  }

  buscarContasPorMes(mes: string): Observable<ContaDTO[]> {
    return this.http.get<ContaDTO[]>(
      `${API_CONFIG.baseUrl}/v1/conta/mes?mes=${mes}`
    );
  }

  buscarConta(id: string): Observable<ContaDTO>{
    return this.http.get<ContaDTO>(
      `${API_CONFIG.baseUrl}/v1/conta?id=${id}`
    );
  }

  statusConta(): Observable<StatusContaDTO[]> {
    return this.http.get<StatusContaDTO[]>(`${API_CONFIG.baseUrl}/v1/conta/status`);
  }

  tipoContas(): Observable<TipoContaDTO[]> {
    return this.http.get<TipoContaDTO[]>(`${API_CONFIG.baseUrl}/v1/tipo/contas`);
  }

}
