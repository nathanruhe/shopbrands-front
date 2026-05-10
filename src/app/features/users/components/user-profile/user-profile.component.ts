import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../store/users.actions';
import { selectUser, selectLoading, selectUserError, selectUserMessage } from '../../store/users.selectors';
// import { AddressService } from '../../../../core/services/address.service';
import { Router } from '@angular/router';
import { User } from '../../../../core/models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user$!: Observable<User | null>;
  error$ = this.store.select(selectUserError);
  loading$ = this.store.select(selectLoading);
  message$ = this.store.select(selectUserMessage);

  // Sección activa por defecto
  activeSection: 'addresses' | 'orders' | 'security' = 'addresses';

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(UsersActions.loadProfile());
    this.user$ = this.store.select(selectUser);
  }

  // Método para cambiar la sección activa
  setActiveSection(section: 'addresses' | 'orders' | 'security') {
    this.activeSection = section;
  }

}