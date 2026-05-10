import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/users.service';
import { StorageService } from '../../../core/services/storage.service';
import * as UsersActions from './users.actions';
import { catchError, delay, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private storageService: StorageService,
        private router: Router
    ) {}

    // PERFIL
    loadProfile$ = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.loadProfile),
        mergeMap(() =>
            this.userService.getProfile().pipe(
                // delay(3000), // eliminar y la importacion tambien
                map(user => UsersActions.loadProfileSuccess({ user })),
                catchError(error => of(UsersActions.loadProfileFailure({ error })))
            )
        )
    ));

    // EDITAR PERFIL
    updateProfile$ = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.updateProfile),
        mergeMap(({ data }) =>
            this.userService.updateProfile(data).pipe(
                map(user => UsersActions.updateProfileSuccess({ user })),
                catchError(error => of(UsersActions.updateProfileFailure({ error })))
            )
        )
    ));

    updateProfileSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.updateProfileSuccess),
        tap(({ user }) => {
            this.storageService.set('user', user);
        })),
        { dispatch: false }
    );

    // CAMBIAR CONTRASEÑA
    changePassword$ = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.changePassword),
        mergeMap(({ data }) =>
            this.userService.changePassword(data).pipe(
                map(response => UsersActions.changePasswordSuccess({ response })),
                catchError(error => of(UsersActions.changePasswordFailure({ error })))
            )
        )
    ));

    // ELIMINAR PERFIL
    deleteProfile$ = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.deleteProfile),
        mergeMap(() =>
            this.userService.deleteProfile().pipe(
                map(response => UsersActions.deleteProfileSuccess({ response })),
                catchError(error => of(UsersActions.deleteProfileFailure({ error })))
            )
        )
    ));

    deleteProfileSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(UsersActions.deleteProfileSuccess),
        tap(() => this.router.navigate(['/auth/login']))
    ),
    { dispatch: false }
    );
}