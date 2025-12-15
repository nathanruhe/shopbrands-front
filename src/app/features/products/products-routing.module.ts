import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'filter', component: ProductFilterComponent },
    { path: ':id', component: ProductDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {}