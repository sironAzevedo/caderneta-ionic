import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContaDTO } from 'src/app/models/interfaces';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class ContaService {
  constructor(public http: HttpClient) {}

  salvarConta(conta: ContaDTO): Observable<any> {
    return this.http.post<any>(`${API_CONFIG.baseUrl}/v1/conta`, conta);
  }

  atualizarConta(conta: ContaDTO): Observable<any> {
    return this.http.put<any>(`${API_CONFIG.baseUrl}/v1/conta`, conta);
  }

  deletarConta(id: string): Observable<any> {
    return this.http.delete<any>(`${API_CONFIG.baseUrl}/v1/conta?conta=${id}`);
  }

  buscarContasPorMes(mes: string): Observable<ContaDTO[]> {
    return this.http.get<ContaDTO[]>(
      `${API_CONFIG.baseUrl}/v1/conta/mes?mes=${mes}`
    );
  }

  buscarStatusConta(): Observable<any[]> {
    return this.http.get<any[]>(`${API_CONFIG.baseUrl}/v1/conta/status`);
  }

}
