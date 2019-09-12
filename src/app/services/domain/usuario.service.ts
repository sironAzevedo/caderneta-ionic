import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContaDTO, UsuarioDTO } from 'src/app/models/interfaces';
import { API_CONFIG } from '../config/api.config';
import { tap } from 'rxjs/operators';

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient) { }


    criarConta(user: UsuarioDTO): Observable<any> {
        return this.http.post<any>(`${API_CONFIG.baseUrl}/v1/user`, user);
    }

    atualizarConta(user: UsuarioDTO): Observable<any> {
        return this.http.put<any>(`${API_CONFIG.baseUrl}/v1/user`, user);
    }

    findByEmail(email: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/user/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    } 

    buscarContasPorMes(mes: string): Observable<ContaDTO[]> {
        return this.http.get<ContaDTO[]>(`${API_CONFIG.baseUrl}/v1/conta/mes?mes=${mes}`);
    }

    deletarConta(id: string): Observable<any> {
        return this.http.delete<any>(`${API_CONFIG.baseUrl}/v1/conta?conta=${id}`);
    }
}

