import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../app/routes/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },
];