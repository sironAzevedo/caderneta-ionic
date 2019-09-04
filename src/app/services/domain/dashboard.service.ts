import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from 'http';
import { Observable } from 'rxjs';
import { Dashboard, TipoConta } from 'src/app/models/schema';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class DashboardService {

    private headers: Headers;
    private options: RequestOptions;

    constructor(public http: HttpClient) {}

    findAll() : Observable<TipoConta[]>  {
        return this.http.get<TipoConta[]>(`${API_CONFIG.baseUrl}/v1/tipoContas`);
    }
}

