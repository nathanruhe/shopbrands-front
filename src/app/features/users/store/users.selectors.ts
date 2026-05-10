import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUser = createSelector(selectUsersState, state => state.user);
export const selectLoading = createSelector(selectUsersState, state => state.loading);
export const selectUserError = createSelector(selectUsersState, state => state.error);
export const selectUserMessage = createSelector(selectUsersState, state => state.message);