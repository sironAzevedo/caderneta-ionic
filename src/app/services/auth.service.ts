import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO, LocalUser, AuthResponse } from '../models/interfaces';
import { API_CONFIG } from './config/api.config';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { JwtHelperService  } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    authenticationState = new BehaviorSubject(false); 
    jwtHelperService: JwtHelperService  = new JwtHelperService ();

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public router: NavController) {
    }

    authenticate(user: CredenciaisDTO): Observable<AuthResponse> {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, user).pipe(
            tap(
                async (res: AuthResponse) => {
                    if (res.token) {
                        this.successfulLogin(res.token);
                    }
                }
            )
        );
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {},
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok,
            email: this.jwtHelperService.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.authenticationState.next(true);
    }

    isAuthenticated() {
       return this.authenticationState.asObservable();
    }

    logout() {
        this.storage.setLocalUser(null);
        this.router.navigateForward('/login');        
        this.authenticationState.next(false);
    }
}
