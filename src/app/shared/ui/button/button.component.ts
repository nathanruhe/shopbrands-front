import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-ui-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})
export class UiButtonComponent {
    @Input() type: 'button' | 'submit' = 'button';
    @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
    @Input() disabled = false;
}
