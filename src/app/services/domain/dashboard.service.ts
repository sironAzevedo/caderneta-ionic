import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardDTO, TipoContaDTO } from 'src/app/models/interfaces';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class DashboardService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<DashboardDTO[]> {
    return this.http.get<DashboardDTO[]>(`${API_CONFIG.baseUrl}/v1/dashboard`);
  }
}