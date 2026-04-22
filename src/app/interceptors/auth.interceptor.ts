import { HttpInterceptorFn } from '@angular/common/http';

// Since Spring Boot backend permits all requests, no auth token needed
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Pass through all requests without modification
  return next(req);
};