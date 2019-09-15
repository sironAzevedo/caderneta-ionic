import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { ErrorInterceptorProvider } from 'src/interceptors/error-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroPageModule } from './pages/usuario/cadastro/cadastro.module';
import { AuthService } from './services/auth.service';
import { ContaService } from './services/domain/conta.service';
import { DashboardService } from './services/domain/dashboard.service';
import { UsuarioService } from './services/domain/usuario.service';
import { StorageService } from './services/storage.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    CadastroPageModule,
    SharedModule
    /* ContaListPageModule */
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DashboardService,
    ContaService,
    StorageService,
    AuthService,
    UsuarioService,
    ErrorInterceptorProvider,
    AuthInterceptorProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
