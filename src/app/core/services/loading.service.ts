import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    private count = 0;
    private _isLoading = new BehaviorSubject<boolean>(false);
    readonly isLoading$ = this._isLoading.asObservable();

    show() {
        this.count++;
        if (this.count === 1) {
        this._isLoading.next(true);
        }
    }

    hide() {
        if (this.count === 0) return;
        this.count--;
        if (this.count === 0) {
        this._isLoading.next(false);
        }
    }

    // útil para forzar reset en casos de error grave
    reset() {
        this.count = 0;
        this._isLoading.next(false);
    }
}
