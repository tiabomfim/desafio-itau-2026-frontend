import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth.routes')
        .then(m => m.AUTH_ROUTES)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home.routes')
        .then(m => m.HOME_ROUTES) 
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];