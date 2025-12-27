import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, take } from 'rxjs';
import { selectIsLoggedIn, selectUser } from '../../features/auth/store/auth.selectors';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const store = inject(Store);
    const router = inject(Router);
    const expectedRole = route.data['role'] as 'admin' | 'customer';

    return combineLatest([
        store.select(selectIsLoggedIn),
        store.select(selectUser)
    ]).pipe(
        take(1),
        map(([isLoggedIn, user]) => {
            if (!isLoggedIn) return router.createUrlTree(['/login']);
            if (user?.role === expectedRole) return true;
            return router.createUrlTree(['/']); // o otra ruta de “no autorizado”
        })
    );
};
