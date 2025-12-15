import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAddressListComponent } from './components/user-address-list/user-address-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserSegurityComponent } from './components/user-segurity/user-segurity.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        UserProfileComponent,
        UserAddressListComponent,
        UserEditComponent,
        UserSegurityComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        UsersRoutingModule,
    ]
})
export class UsersModule {}
