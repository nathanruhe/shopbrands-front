import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../../core/models/user.model';

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
    message: string | null;
}

export const initialState: AuthState = {
    user: null,
    token: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    message: null,
};

export const authReducer = createReducer(
    initialState,

    // CONECTARSE
    on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
    on(AuthActions.loginSuccess, (state, { response }) => ({
        ...state,
        user: response.user,
        token: response.token,
        isLoggedIn: true,
        loading: false
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // DESCONECTARSE
    on(AuthActions.logout, () => initialState),

    // REGISTRARSE
    on(AuthActions.register, state => ({ ...state, loading: true, error: null })),

    on(AuthActions.registerSuccess, (state, { response }) => ({
        ...state,
        loading: false,
        error: null,
        message: response.message
    })),

    on(AuthActions.registerFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // CAMBIAR CONTRASEÑA
    on(AuthActions.changePassword, state => ({ ...state, loading: true, error: null })),
    on(AuthActions.changePasswordSuccess, state => ({ ...state, loading: false })),
    on(AuthActions.changePasswordFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // RECUPERAR CONTRASEÑA
    on(AuthActions.forgotPassword, state => ({
        ...state,
        loading: true,
        error: null,
        message: null
    })),

    on(AuthActions.forgotPasswordSuccess, (state, { response }) => ({
        ...state,
        loading: false,
        error: null,
        message: response.message
    })),

    on(AuthActions.forgotPasswordFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // RESETEAR CONTRASEÑA
    on(AuthActions.resetPassword, state => ({ ...state, loading: true, error: null })),
    on(AuthActions.resetPasswordSuccess, state => ({ ...state, loading: false })),
    on(AuthActions.resetPasswordFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // LIMPIAR
    on(AuthActions.clearAuthFeedback, state => ({
        ...state,
        error: null,
        message: null,
    })),
);
