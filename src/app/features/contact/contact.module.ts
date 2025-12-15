import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';

import { ContactPageComponent } from './components/contact-page/contact-page.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        ContactPageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        ContactRoutingModule,
    ]
})
export class ContactModule {}
