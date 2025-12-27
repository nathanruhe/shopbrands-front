import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth.actions';
import { selectAuthError, selectIsLoading, selectAuthMessage } from '../../store/auth.selectors';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  error$ = this.store.select(selectAuthError);
  loading$ = this.store.select(selectIsLoading);
  message$ = this.store.select(selectAuthMessage);
  token!: string;

  form = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', Validators.required]
    },
    { validators: this.passwordMatch }
  );

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    if (!this.token) {
      this.router.navigate(['/auth/login']);
    }

    this.form.valueChanges.subscribe(() => {
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
      token: this.token,
      new_password: this.form.controls.password.value!,
    };

    this.store.dispatch(AuthActions.resetPassword({data: payload}));
  }
}