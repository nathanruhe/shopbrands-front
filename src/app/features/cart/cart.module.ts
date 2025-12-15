import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CartRoutingModule } from './cart-routing.module';

import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartCheckoutComponent } from './components/cart-checkout/cart-checkout.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        CartItemComponent,
        CartSummaryComponent,
        CartCheckoutComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        CartRoutingModule,
    ]
})
export class CartModule {}
