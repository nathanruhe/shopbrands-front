import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component';
import { DashboardOrdersComponent } from './components/dashboard-orders/dashboard-orders.component';
import { DashboardUsersComponent } from './components/dashboard-users/dashboard-users.component';
import { DashboardChartsComponent } from './components/dashboard-charts/dashboard-charts.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        DashboardOverviewComponent,
        DashboardOrdersComponent,
        DashboardUsersComponent,
        DashboardChartsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        DashboardRoutingModule,
    ]
})
export class DashboardModule {}
