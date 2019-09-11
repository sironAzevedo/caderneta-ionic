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
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    /* ,    canActivate: [LoggedGuardService] */
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
    /* ,    canActivate: [AuthGuardService] */
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { 
    path: 'conta-list', 
    loadChildren: () => import('./pages/pages-contas/conta-list/conta-list.module').then(m => m.ContaListPageModule)
  },
  { 
    path: 'conta-detail', 
    loadChildren: () => import('./pages/pages-contas/conta-detail/conta-detail.module').then(m => m.ContaDetailPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
