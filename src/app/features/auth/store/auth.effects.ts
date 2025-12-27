import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private storageService: StorageService,
        private router: Router
    ) {}

    // CONECTARSE
    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.login),
        mergeMap(({ data }) =>
            this.authService.login(data).pipe(
                map(response => AuthActions.loginSuccess({ response })),
                catchError(err =>
                    of(AuthActions.loginFailure({
                    error: err?.message || 'Error al iniciar sesión'
                    }))
                )
            )
        )
    ));

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ response }) => {
            this.storageService.set('token', response.token);
            this.storageService.set('user', response.user);
            this.router.navigate(['/products']);
        })
        ),
        { dispatch: false }
    );

    // DESCONECTARSE
    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
            this.storageService.remove('token');
            this.storageService.remove('user');
            this.router.navigate(['/auth/login']);
        })
        ),
        { dispatch: false }
    );

    // REGISTRARSE
    register$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.register),
        mergeMap(({ data }) =>
            this.authService.register(data).pipe(
                map(response => AuthActions.registerSuccess({ response })),
                catchError(err =>
                    of(AuthActions.registerFailure({
                    error: err?.message || 'Error en el registro'
                    }))
                )
            )
        )
    ));

    registerSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(({ response }) => {
            console.log(response.message)
            setTimeout(() => {
                this.router.navigate(['/auth/login']);
            }, 2000);
        })
    ),
    { dispatch: false }
    );

    // CAMBIAR CONTRASEÑA
    changePassword$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.changePassword),
        mergeMap(({ data }) =>
            this.authService.changePassword(data).pipe(
                map(response => AuthActions.changePasswordSuccess({ response })),
                catchError(err =>
                    of(AuthActions.changePasswordFailure({
                        error: err?.message || 'Error al cambiar contraseña'
                    }))
                )
            )
        )
    ));

    // RECUPERAR CONTRASEÑA
    forgotPassword$ = createEffect(() =>
        this.actions$.pipe(
        ofType(AuthActions.forgotPassword),
        mergeMap(({ data }) =>
            this.authService.forgotPassword(data).pipe(
                map(response => AuthActions.forgotPasswordSuccess({ response })),
                catchError(err =>
                    of(AuthActions.forgotPasswordFailure({
                        error: err?.message || 'No existe ninguna cuenta con este email!'
                    }))
                )
            )
        )
    ));

    forgotPasswordSuccess$ = createEffect(() => this.actions$.pipe(
            ofType(AuthActions.forgotPasswordSuccess),
            tap(({ response }) => {
                console.log(response.message)
                setTimeout(() => {
                    this.router.navigate(['/auth/login']);
                }, 3000);
            })
            ),
        { dispatch: false }
    );

    // RESETEAR CONTRASEÑA
    resetPassword$ = createEffect(() =>
        this.actions$.pipe(
        ofType(AuthActions.resetPassword),
        mergeMap(({ data }) =>
            this.authService.resetPassword(data).pipe(
                map(response => AuthActions.resetPasswordSuccess({ response })),
                catchError(err =>
                    of(AuthActions.resetPasswordFailure({
                        error: err?.message || 'Error al restablecer contraseña'
                    }))
            )
            )
        )
    ));

    resetPasswordSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.resetPasswordSuccess),
        tap(() => this.router.navigate(['/auth/login']))
    ),
    { dispatch: false }
    );
}