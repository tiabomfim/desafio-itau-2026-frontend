import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/login/login')
        .then(c => c.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../../app/features/register/register')
        .then(c => c.RegisterComponent)
  }
];
