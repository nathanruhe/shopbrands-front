import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User } from '../../../core/models/user.model';

export interface UsersState {
    user: User | null;
    loading: boolean;
    error: string | null;
    message: string | null;
}

export const initialState: UsersState = {
    user: null,
    loading: false,
    error: null,
    message: null,
}

export const usersReducer = createReducer(
    initialState,

    // PERFIL
    on(UsersActions.loadProfile, state => ({ ...state, loading: true, error: null })),
    on(UsersActions.loadProfileSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        user: user,
    })),
    on(UsersActions.loadProfileFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // EDITAR PERFIL
    on(UsersActions.updateProfile, state => ({ ...state, loading: true, error: null })),
    on(UsersActions.updateProfileSuccess, (state, { user }) => ({
        ...state,
        user: user,
        loading: false,
    })),
    on(UsersActions.updateProfileFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // CAMBIAR CONTRASEÑA
    on(UsersActions.changePassword, state => ({ ...state, loading: true, error: null })),
    on(UsersActions.changePasswordSuccess, state =>({ 
        ...state, 
        loading: false
    })),
    on(UsersActions.changePasswordFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // ELIMINAR PERFIL
    on(UsersActions.deleteProfile, state => ({ ...state, loading: true, error: null })),
    on(UsersActions.deleteProfileSuccess, (state, { response }) => ({
        ...initialState,
        message: response.message
    })),
    on(UsersActions.deleteProfileFailure, (state, { error }) => ({...state, loading: false, error })),
);