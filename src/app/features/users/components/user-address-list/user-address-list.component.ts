import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AddressService } from '../../../../core/services/address.service';
import { Address, CreateAddress, UpdateAddress } from '../../../../core/models/address.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/users.selectors';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-address-list',
  templateUrl: './user-address-list.component.html',
  styleUrls: ['./user-address-list.component.css']
})
export class UserAddressListComponent implements OnInit, OnDestroy {
  addresses: Address[] = [];
  loading = false;
  error: string | null = null;

  editing: Address | null = null;
  form!: FormGroup;
  showForm = false;

  private destroy$ = new Subject<void>();
  user: User | null = null;

  constructor(
    private addressService: AddressService,
    private fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef // Necesario para forzar la vista en Angular 16
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
    this.initForm();

    this.store.select(selectUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(u => this.user = u);
  }

  initForm() {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      province: [''],
      postal_code: [''],
      country: ['', Validators.required],
      phone: [''],
      type: ['shipping'],
      is_default: [false]
    });
  }

  loadAddresses() {
    this.loading = true;
    this.addressService.getUserAddresses().subscribe({
      next: (list) => {
        // MAPEADO CRÍTICO: Convertimos el 1/0 de MySQL a Boolean de JS
        this.addresses = list.map(addr => ({
          ...addr,
          is_default: !!addr.is_default 
        })) || [];
        
        this.loading = false;
        this.cdr.detectChanges(); // Notificamos a Angular 16 del cambio
      },
      error: (err) => {
        this.error = err?.message || 'Error cargando direcciones';
        this.loading = false;
      }
    });
  }

  openNew() {
    this.editing = null;
    this.showForm = true;

    if (this.user) {
      this.form.patchValue({ 
        first_name: this.user.first_name, 
        last_name: this.user.last_name,
        is_default: this.addresses.length === 0 
      });
    } else {
      this.form.reset({ type: 'shipping', is_default: false });
    }
  }

  openEdit(address: Address) {
    this.editing = address;
    this.showForm = true;
    this.form.patchValue({
      ...address,
      // is_default: !!address.is_default
    });
  }

  makeDefault(address: Address) {
    if (address.is_default) return;

    this.loading = true;

    this.addressService.setDefaultAddress(address.id).subscribe({
      next: () => {
        this.loadAddresses();
      },
      error: (err) => {
        this.loading = false;
        alert(err?.message || 'Error al cambiar dirección predeterminada');
      }
    });
  }

  cancel() {
    this.showForm = false;
    this.editing = null;
    this.form.reset({ type: 'shipping', is_default: false });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;

    if (this.editing) {
      this.addressService.updateAddress(this.editing.id, payload).subscribe({
        next: () => {
          this.loadAddresses();
          this.cancel();
        },
        error: (err) => alert(err?.message || 'Error actualizando')
      });
    } else {
      this.addressService.createAddress(payload).subscribe({
        next: () => {
          this.loadAddresses();
          this.cancel();
        },
        error: (err) => alert(err?.message || 'Error creando')
      });
    }
  }

  remove(address: Address) {
    if (!window.confirm('¿Eliminar esta dirección?')) return;
    this.addressService.deleteAddress(address.id).subscribe({
      next: () => this.loadAddresses(),
      error: (err) => alert(err?.message || 'Error eliminando')
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
