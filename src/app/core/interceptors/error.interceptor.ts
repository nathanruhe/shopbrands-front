import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let message = 'Ocurrió un error inesperado';

                if (error.error?.message) {
                    message = error.error.message;
                } else if (error.status === 401) {
                    message = 'No autorizado';
                    localStorage.removeItem('token');
                    this.router.navigate(['/login']);
                } else if (error.status === 403) {
                    message = 'No tienes permisos para acceder a este recurso';
                    window.history.back();
                }

                console.error('HTTP Error:', error);
                return throwError(() => ({ message, status: error.status }));
            })
        );
    }
}
