import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InfoRoutingModule } from './info-routing.module';

import { FaqComponent } from './components/faq/faq.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsComponent } from './components/terms/terms.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        FaqComponent,
        PrivacyPolicyComponent,
        TermsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        InfoRoutingModule
    ]
})
export class InfoModule {}
