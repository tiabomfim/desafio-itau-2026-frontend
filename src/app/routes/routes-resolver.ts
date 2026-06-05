import { ResolveFn } from '@angular/router';

export const routesResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
