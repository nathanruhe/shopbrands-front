import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAddressListComponent } from './components/user-address-list/user-address-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserSegurityComponent } from './components/user-segurity/user-segurity.component';

import { SharedModule } from '../../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';

// OTROS IMPORTS PARA MOSTRAR EN EL PERFIL DEL USUARIO
// para mostrar los pedidos del usuario en su perfil, he de importar el modulo de pedidos, para usar el componente de historial de pedidos que se encuentra en ese modulo
import { OrdersModule } from '../orders/orders.module';

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
        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([UsersEffects]),
        
        // IMPORTACION DEL MODULO DE PEDIDOS PARA MOSTRAR LOS PEDIDOS DEL USUARIO EN SU PERFIL
        OrdersModule
    ] 
})
export class UsersModule {}
