import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserAddressListComponent } from './components/user-address-list/user-address-list.component';
import { UserSegurityComponent } from './components/user-segurity/user-segurity.component';

const routes: Routes = [
    { path: '', component: UserProfileComponent },
    { path: 'edit', component: UserEditComponent },
    { path: 'addresses', component: UserAddressListComponent },
    { path: 'security', component: UserSegurityComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
