import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthError, selectIsLoading, selectAuthMessage } from '../../store/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error$ = this.store.select(selectAuthError);
  loading$ = this.store.select(selectIsLoading);
  message$ = this.store.select(selectAuthMessage);

  form = this.fb.group(
    {
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', Validators.required],
      phone: ['']
    },
    { validators: this.passwordMatch }
  );

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.form.get('email')!.valueChanges.subscribe(() => {
      this.store.dispatch(AuthActions.clearAuthFeedback());
    });
  }

  passwordMatch(control: AbstractControl) {
    const { password, password_confirm } = control.value || {};
    return password === password_confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      first_name: this.form.controls.first_name.value!,
      last_name: this.form.controls.last_name.value!,
      email: this.form.controls.email.value!,
      password: this.form.controls.password.value!,
      role: 'customer' as const,
      phone: this.form.controls.phone.value || null
    };

    this.store.dispatch(AuthActions.register({ data: payload }));
  }
}
