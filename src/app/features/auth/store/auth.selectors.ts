import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(selectAuthState, state => state.isLoggedIn);
export const selectUser = createSelector(selectAuthState, state => state.user);
export const selectToken = createSelector(selectAuthState, state => state.token);
export const selectAuthError = createSelector(selectAuthState, state => state.error);
export const selectIsLoading = createSelector(selectAuthState, state => state.loading);
export const selectAuthMessage = createSelector(selectAuthState, state => state.message);