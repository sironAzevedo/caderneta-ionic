import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO, LocalUser, AuthResponse } from '../models/interfaces';
import { API_CONFIG } from './config/api.config';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {

    authenticationState = new BehaviorSubject(false);

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
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
            email: null //this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
        this.authenticationState.next(true);
    }

    isAuthenticated() {
        if(this.storage.getLocalUser().token){
            return true;
        } 
        return false;
    }

    logout() {
        this.storage.setLocalUser(null);
        this.authenticationState.next(false);
    }
}
