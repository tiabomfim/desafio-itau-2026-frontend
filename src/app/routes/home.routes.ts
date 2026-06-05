import { Routes } from '@angular/router';
import { authGuard } from '../../app/core/guard/auth.guard'; 

export const HOME_ROUTES: Routes = [
   {
    path: '',
    canActivate: [authGuard], 
    loadComponent: () =>
      import('../../app/features/home/home')
        .then(c => c.Home)
  }
];