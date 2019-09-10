import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardDTO, TipoContaDTO } from 'src/app/models/interfaces';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class DashboardService {


    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT',
            'Access-Control-Allow-Credentials':'false',
        })
    };

    constructor(public http: HttpClient) { }



    findAll(): Observable<TipoContaDTO[]> {
        return this.http.get<TipoContaDTO[]>(`${API_CONFIG.baseUrl}/v1/tipoContas`);
    }
}

