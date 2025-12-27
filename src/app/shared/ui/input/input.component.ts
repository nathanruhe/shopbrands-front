import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-ui-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class UiInputComponent {

    @Input() label?: string;
    @Input() type: string = 'text';
    @Input() placeholder: string = '';
    @Input() control!: FormControl;
    @Input() name?: string;

    get showError(): boolean {
        return this.control?.invalid && this.control?.touched;
    }

    get errorMessage(): string | null {
        if (!this.control?.errors) return null;

        if (this.control.errors['required']) return 'Este campo es obligatorio';
        if (this.control.errors['email']) return 'Email no válido';
        if (this.control.errors['minlength']) {
        const required = this.control.errors['minlength'].requiredLength;
        return `Mínimo ${required} caracteres`;
        }
        if (this.control.errors['maxlength']) {
        const required = this.control.errors['maxlength'].requiredLength;
        return `Máximo ${required} caracteres`;
        }

        return 'Campo no válido';
    }
}
