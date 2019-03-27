import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthService } from "src/app/services/_index.service";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    // Attach JWT to headers of each request
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let _token = this.authService.getUserToken();
        if (_token !== null && _token !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${_token}`
                }
            });
        }
        return next.handle(request);
    }
}