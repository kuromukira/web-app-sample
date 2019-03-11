import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../../services/_index.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authServe: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authServe.signOut().then(() => {
                    location.reload(true);
                });
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}