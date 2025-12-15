import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component';
import { DashboardOrdersComponent } from './components/dashboard-orders/dashboard-orders.component';
import { DashboardUsersComponent } from './components/dashboard-users/dashboard-users.component';
import { DashboardChartsComponent } from './components/dashboard-charts/dashboard-charts.component';

const routes: Routes = [
    { path: 'dashboard-overview', component: DashboardOverviewComponent },
    { path: 'dashboard-orders', component: DashboardOrdersComponent },
    { path: 'dashboard-users', component: DashboardUsersComponent },
    { path: 'dashboard-charts', component: DashboardChartsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}