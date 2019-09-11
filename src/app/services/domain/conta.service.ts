import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContaDTO } from 'src/app/models/interfaces';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class ContaService {

    constructor(public http: HttpClient) { }

    buscarContasPorMes(mes: string): Observable<ContaDTO[]> {
        return this.http.get<ContaDTO[]>(`${API_CONFIG.baseUrl}/v1/conta/mes?mes=${mes}`);
    }

    deletarConta(id: string): Observable<any>{
        return this.http.delete<any>(`${API_CONFIG.baseUrl}/v1/conta?conta=${id}`);
    }
}

