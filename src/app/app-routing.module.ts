import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoggedGuardService } from './services/logged-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoggedGuardService]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'contas',
    loadChildren: () => import('./pages/pages-contas/conta-list/conta-list.module').then(m => m.ContaListPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'conta',
    loadChildren: () => import('./pages/pages-contas/conta-detail/conta-detail.module').then(m => m.ContaDetailPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/usuario/cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/usuario/logout/logout.module').then(m => m.LogoutPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
