import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loading: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const skip = req.headers.has('X-Skip-Loading');
        if (!skip) {
        this.loading.show();
            console.log('[LoadingInterceptor] Show for', req.url);
        } else {
            console.log('[LoadingInterceptor] Skipped for', req.url);
        }

        return next.handle(req).pipe(
        finalize(() => {
            if (!skip) {
                this.loading.hide();
                console.log('[LoadingInterceptor] Hide for', req.url);
            }
        })
        );
    }
}
