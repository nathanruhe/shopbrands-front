import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';

const routes: Routes = [
    { path: 'cart-summary', component: CartSummaryComponent },
    { path: 'checkout', component: CartCheckoutComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CartRoutingModule {}
