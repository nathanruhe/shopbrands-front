import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';

import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderInvoiceComponent } from './components/order-invoice/order-invoice.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        OrderFormComponent,
        OrderHistoryComponent,
        OrderConfirmationComponent,
        OrderInvoiceComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OrdersRoutingModule,
        SharedModule
    ],

    // exporto los componentes para poder usarlos en el perfil del usuario, aunque no se si es necesario exportarlos todos, o solo el order history e invoice, que son los que se mostraran en el perfil
    exports: [
        OrderFormComponent,
        OrderHistoryComponent,
        OrderConfirmationComponent,
        OrderInvoiceComponent
    ]
})
export class OrdersModule {}
