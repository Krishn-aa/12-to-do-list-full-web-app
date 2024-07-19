import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


export function authInterceptor(req: HttpRequest<unknown>,next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authToken = sessionStorage.getItem('authToken');
  if (authToken) {
    const cloned = req.clone({headers: req.headers.set('Authorization', `Bearer ${authToken}`)});
    return next(cloned);
  } else {
    return next(req);
  }
}
