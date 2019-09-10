import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardService } from './services/domain/dashboard.service';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { StorageService } from './services/storage.service';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DashboardService,
    StorageService,
    AuthService,
    ErrorInterceptorProvider,
    AuthInterceptorProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
