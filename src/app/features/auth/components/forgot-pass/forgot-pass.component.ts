import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthError, selectIsLoading, selectAuthMessage } from '../../store/auth.selectors';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  error$ = this.store.select(selectAuthError);
  loading$ = this.store.select(selectIsLoading);
  message$ = this.store.select(selectAuthMessage);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.store.dispatch(AuthActions.clearAuthFeedback());
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      email: this.form.controls.email.value!,
    };

    this.store.dispatch(AuthActions.forgotPassword({ data: payload }));
  }
}
