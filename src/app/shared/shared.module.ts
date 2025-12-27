import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/** Layouts */
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

/** Shared UI Components */
import { UiButtonComponent } from './ui/button/button.component';
import { UiInputComponent } from './ui/input/input.component';
import { UiCardComponent } from './ui/card/card.component';
import { UiAvatarComponent } from './ui/avatar/avatar.component';

/** Directives */
import { HighlightDirective } from './directives/highlight.directive';

/** Pipes */
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';

/** Components */
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        // layouts
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,

        // ui
        UiButtonComponent,
        UiInputComponent,
        UiCardComponent,
        UiAvatarComponent,

        // directives & pipes
        HighlightDirective,
        CurrencyFormatPipe,

        // components
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule   
    ],
    exports: [
        ReactiveFormsModule,

        // layouts
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,

        // ui components
        UiButtonComponent,
        UiInputComponent,
        UiCardComponent,
        UiAvatarComponent,

        // directives & pipes
        HighlightDirective,
        CurrencyFormatPipe,

        // components
        LoadingSpinnerComponent
    ]
})
export class SharedModule {}
