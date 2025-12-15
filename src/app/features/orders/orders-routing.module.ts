import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { OrderInvoiceComponent } from './components/order-invoice/order-invoice.component';

const routes: Routes = [
  { path: '', component: OrderHistoryComponent},
  { path: 'create', component: OrderFormComponent},
  { path: 'confirmation/:id', component: OrderConfirmationComponent },
  { path: ':id/invoice', component: OrderInvoiceComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {}
