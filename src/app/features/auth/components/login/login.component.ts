import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthError, selectIsLoading } from '../../store/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error$ = this.store.select(selectAuthError);
  loading$ = this.store.select(selectIsLoading);

  form = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
  );

  constructor(private fb: FormBuilder, private store: Store) {}

    onSubmit() {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
  
      const payload = {
        email: this.form.controls.email.value!,
        password: this.form.controls.password.value!,
      };
  
      this.store.dispatch(AuthActions.login({ data: payload }));
    }
}
