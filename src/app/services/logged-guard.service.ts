import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoggedGuardService implements CanActivate {
    constructor(
        public auth: AuthService,
        public router: NavController) { }

    canActivate(): Observable<boolean> {
        return this.auth.isAuthenticated();
    }

    /* canActivate(): Promise<boolean> {
        return new Promise(resolve => {
            this.auth.isAuthenticated().subscribe(state => {
                if (state) {
                    console.log(state);
                    this.router.navigateRoot('/dashboard');
                }
                resolve(!state ? true : false);
            })
        });
    } */
}