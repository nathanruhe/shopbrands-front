import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { Product } from '../../../core/models/product.model';

export interface ProductsState {
    products: Product[] | null,
    loading: boolean;
    error: string | null;
    message: string | null;
}

export const initialState: ProductsState = {
    products: null,
    loading: false,
    error: null,
    message: null,
};

export const productsReducer = createReducer(
    initialState,

    // CARGAR PRODUCTOS
    on(ProductsActions.loadProducts, (state) => ({ ...state, loading: true, error: null })),
    on(ProductsActions.loadProductsSuccess, (state, { products }) => ({ 
        ...state, 
        loading: false, 
        products: products, 
    })),
    on(ProductsActions.loadProductsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // CARGAR PRODUCTO POR ID
    on(ProductsActions.loadProduct, (state) => ({ ...state, loading: true, error: null })),
    on(ProductsActions.loadProductSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: state.products ? [...state.products.filter(p => p.id !== product.id), product] : [product],
    })),
    on(ProductsActions.loadProductFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // CREAR PRODUCTO
    on(ProductsActions.createProduct, (state) => ({ ...state, loading: true, error: null })),
    on(ProductsActions.createProductSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: state.products ? [...state.products, product] : [product],
    })),
    on(ProductsActions.createProductFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // ACTUALIZAR PRODUCTO
    on(ProductsActions.updateProduct, (state) => ({ ...state, loading: true, error: null })),
    on(ProductsActions.updateProductSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: state.products ? state.products.map(p => p.id === product.id ? product : p) : [product],
    })),
    on(ProductsActions.updateProductFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // ELIMINAR PRODUCTO
    on(ProductsActions.deleteProduct, (state) => ({ ...state, loading: true, error: null })),
    on(ProductsActions.deleteProductSuccess, (state, { id, response }) => ({
        ...initialState,
        products: state.products ? state.products.filter(p => p.id !== id) : null,
        message: response.message
    })),
    on(ProductsActions.deleteProductFailure, (state, { error }) => ({ ...state, loading: false, error })),
);