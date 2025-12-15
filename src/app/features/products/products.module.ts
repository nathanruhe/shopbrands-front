import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

import { SharedModule } from '../../shared/shared.module';

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
    ]
})
export class ProductsModule {}
