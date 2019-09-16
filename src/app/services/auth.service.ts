import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavController } from '@ionic/angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import {
  AuthResponse,
  CredenciaisDTO,
  LocalUser,
  EmailDTO
} from '../models/interfaces';
import { API_CONFIG } from './config/api.config';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {
  authenticationState = new BehaviorSubject(false);
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public router: NavController
  ) {}

  authenticate(user: CredenciaisDTO): Observable<AuthResponse> {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, user).pipe(
      retry(2),
      tap(async (res: AuthResponse) => {
        if (res.token) {
          this.successfulLogin(res.token);
        }
      }),
      catchError(error => {
        console.error('Mensagem: ' + error.message);
        console.log('Mensagem: ' + error);
        return of(error);
      })
    );
  }

  forgot(email: EmailDTO): Observable<any> {
    return this.http.post<any>(`${API_CONFIG.baseUrl}/auth/forgot`, email);
  }

  tokenRefresh(): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_CONFIG.baseUrl}/auth/new_password`, {})
      .pipe(
        tap(async (res: AuthResponse) => {
          if (res.token) {
            this.successfulLogin(res.token);
          }
        }),
        catchError(error => {
          console.error('Mensagem: ' + error.message);
          console.log('Mensagem: ' + error);
          return of(error);
        })
      );
  }

  successfulLogin(authorizationValue: string) {
    const tok = authorizationValue.substring(7);
    const user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
    this.authenticationState.next(true);
  }

  isAuthenticated(): Observable<boolean> {
    const jwt = this.storage.getLocalUser();
    if (jwt && !this.jwtHelper.isTokenExpired(jwt.token)) {
      this.authenticationState.next(true);
    } else {
      this.authenticationState.next(false);
    }
    return of(this.authenticationState.value);
  }

  logout() {
    this.storage.setLocalUser(null);
    this.router.navigateRoot('/login');
  }
}
