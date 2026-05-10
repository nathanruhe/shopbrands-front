import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../../core/services/products.service';
import * as ProductsActions from './products.actions';
import { catchError, delay, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProductsEffects {
    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
        private router: Router
    ) {}

    // CARGAR PRODUCTOS
    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsActions.loadProducts),
        mergeMap(action =>
            this.productsService.getAll(action.categories, action.limit, action.offset).pipe(
            map(products => ProductsActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductsActions.loadProductsFailure({ error })))
            )
        )
    ));

    // OBTENER UN PRODUCTO POR ID
    loadProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsActions.loadProduct),
        mergeMap(action =>
            this.productsService.getById(action.id).pipe(
            map(product => ProductsActions.loadProductSuccess({ product })),
            catchError(error => of(ProductsActions.loadProductFailure({ error })))
            )
        )
    ));

    // CREAR PRODUCTO
    createProduct$ = createEffect(() =>
        this.actions$.pipe(
        ofType(ProductsActions.createProduct),
        mergeMap(action =>
            this.productsService.create(action.data).pipe(
            map(resp => ProductsActions.createProductSuccess({ product: { ...action.data, id: resp.id, image_url: '' } })),
            catchError(error => of(ProductsActions.createProductFailure({ error })))
            )
        )
    ));

    createProductSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsActions.createProductSuccess),
        tap(( { product } ) => {
            this.router.navigate(['/products/create', product.id]);
        })),
        { dispatch: false }
    );

    // ACTUALIZAR PRODUCTO
    updateProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsActions.updateProduct),
        mergeMap(action =>
            this.productsService.update(action.id, action.data).pipe(
            map(product => ProductsActions.updateProductSuccess({ product })),
            catchError(error => of(ProductsActions.updateProductFailure({ error })))
            )
        )
        )
    );

    updateProductSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsActions.updateProductSuccess),
        tap(( { product } ) => {
            this.router.navigate(['/products/edit', product.id]);
        })),
        { dispatch: false }
    );

    // ELIMINAR PRODUCTO
    deleteProduct$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsActions.deleteProduct),
        mergeMap(( { id } ) =>
            this.productsService.delete(id).pipe(
                map((response) => ProductsActions.deleteProductSuccess({ id, response })),
                catchError(error => of(ProductsActions.deleteProductFailure({ error })))
            )
        )
    ));

    deleteProductSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(ProductsActions.deleteProductSuccess),
        tap(() => this.router.navigate(['/products']))
    ),
    { dispatch: false }
    );
}
