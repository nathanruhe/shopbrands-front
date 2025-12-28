import { Component, OnDestroy } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-loading-overlay',
    templateUrl: './loading-overlay.component.html',
    styleUrls: ['./loading-overlay.component.css']
})
export class LoadingOverlayComponent implements OnDestroy {
    show = false;
    private sub: Subscription;

    // opcional: pequeño retraso para evitar parpadeos
    private showTimer: any = null;
    private readonly SHOW_DELAY = 120; // ms

    constructor(private loading: LoadingService) {
        this.sub = this.loading.isLoading$.subscribe(isLoading => {
        if (isLoading) {
            // show con delay para evitar flicker
            clearTimeout(this.showTimer);
            this.showTimer = setTimeout(() => this.show = true, this.SHOW_DELAY);
        } else {
            clearTimeout(this.showTimer);
            this.showTimer = null;
            this.show = false;
        }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        clearTimeout(this.showTimer);
    }
}
