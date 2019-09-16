import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FieldMessage } from 'src/app/models/interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public storage: StorageService,
    public alertController: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        let errorObj = error;
        if (errorObj.error) {
          errorObj = errorObj.error;
        }
        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }

        console.log('Erro detectado pelo interceptor:');
        console.log(errorObj);

        switch (errorObj.status) {
          case 401:
            this.handle401();
            break;

          case 403:
            this.handle403();
            break;

          case 422:
            this.handle422(errorObj);
            break;

          default:
            this.handleDefaultEror(errorObj);
        }

        return throwError(errorObj);
      })
    ) as any;
  }

  async handle401() {
    const alert = await this.alertController.create({
      header: 'Erro 401: falha de autenticação',
      message: 'Email ou senha incorretos.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async handle403() {
    await this.storage.setLocalUser(null);
  }

  async handle422(error) {
    const alert = await this.alertController.create({
      header: 'Erro 422: Validação',
      message: this.listErrors(error.errors),
      buttons: ['OK']
    });
    await alert.present();
  }

  async handleDefaultEror(error) {
    const alert = await this.alertController.create({
      header: 'Erro ' + error.status,
      message: error.mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  private listErrors(messages: FieldMessage[]): string {
    let s = '';
    for (let i = 0; i < messages.length; i++) {
      s = s +
        '<p><strong>' +
        messages[i].fieldName +
        '</strong>: ' +
        messages[i].message +
        '</p>';
    }
    return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
