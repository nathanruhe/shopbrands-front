import { createAction, props } from '@ngrx/store';
import { Product, CreateProduct, UpdateProduct, DeleteProduct } from '../../../core/models/product.model';

// CARGAR PRODUCTOS
export const loadProducts = createAction('[Products] Load Products', props<{ categories?: number[], limit?: number, offset?: number }>());
export const loadProductsSuccess = createAction('[Products] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Products] Load Products Failure', props<{ error: string }>());

// ObBTENER UN PRODUCTO POR ID
export const loadProduct = createAction('[Products] Load Product', props<{ id: number }>());
export const loadProductSuccess = createAction('[Products] Load Product Success', props<{ product: Product }>());
export const loadProductFailure = createAction('[Products] Load Product Failure', props<{ error: string }>());

// CREAR PRODUCTO
export const createProduct = createAction('[Products] Create Product', props<{ data: CreateProduct }>());
export const createProductSuccess = createAction('[Products] Create Product Success', props<{ product: Product }>());
export const createProductFailure = createAction('[Products] Create Product Failure', props<{ error: string }>());

// ACTUALIZAR PRODUCTO
export const updateProduct = createAction('[Products] Update Product', props<{ id: number, data: UpdateProduct }>());
export const updateProductSuccess = createAction('[Products] Update Product Success', props<{ product: Product }>());
export const updateProductFailure = createAction('[Products] Update Product Failure', props<{ error: string }>());

// ELIMINAR PRODUCTO
export const deleteProduct = createAction('[Products] Delete Product', props<{ id: number }>());
export const deleteProductSuccess = createAction('[Products] Delete Product Success', props<{ id: number, response: DeleteProduct }>());
export const deleteProductFailure = createAction('[Products] Delete Product Failure', props<{ error: string }>());
