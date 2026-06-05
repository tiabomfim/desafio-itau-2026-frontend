import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): any => {
  const authService = inject(AuthService);
  const token: string | null = authService.obterToken();

  if (token === null || token.trim() === '') {
    return next(req);
  }

  const requestComToken: HttpRequest<unknown> = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(requestComToken);
};