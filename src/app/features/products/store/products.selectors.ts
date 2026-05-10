import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(selectProductsState, (state) => state.products);
export const selectProductById = (id: number) => createSelector(selectProductsState, (state) => state.products ? state.products.find(p => p.id === id) : null);
export const selectProductsLoading = createSelector(selectProductsState, (state) => state.loading);
export const selectProductsError = createSelector(selectProductsState, (state) => state.error);
export const selectProductsMessage = createSelector(selectProductsState, (state) => state.message);