import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

import { SharedModule } from '../../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productsReducer } from './store/products.reducer';
import { ProductsEffects } from './store/products.effects';

// OTROS IMPORTS PARA MOSTRAR EN LA PAGINA PRODUCTO, COMO EL BOTON DE AÑADIR AL CARRITO, HE DE IMPORTAR EL MODULO DE CARRITO, PARA USAR EL COMPONENTE DE ITEM DE CARRITO QUE SE ENCUENTRA EN ESE MODULO Y ASI MOSTRARLO EN LA PAGINA DE DETALLE DE PRODUCTO, PARA QUE EL USUARIO PUEDA AÑADIR EL PRODUCTO AL CARRITO DESDE LA PAGINA DE DETALLE DEL PRODUCTO Y NO SOLO DESDE LA PAGINA DE LISTADO DE PRODUCTOS QUE ES DONDE SE MUESTRA EL BOTON DE AÑADIR AL CARRITO EN LA LISTA DE PRODUCTOS, PERO SI EL USUARIO ESTA EN LA PAGINA DE DETALLE DE UN PRODUCTO Y QUIERE AÑADIRLO AL CARRITO, NO PODRA HACERLO SI NO IMPORTO EL MODULO DE CARRITO PARA USAR EL COMPONENTE DE ITEM DE CARRITO EN LA PAGINA DE DETALLE DE PRODUCTO
import { CartModule } from '../cart/cart.module';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductFilterComponent,
        ProductDetailComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        ProductsRoutingModule,
        StoreModule.forFeature('products', productsReducer),
        EffectsModule.forFeature([ProductsEffects]),

        CartModule
    ]
})
export class ProductsModule {}
