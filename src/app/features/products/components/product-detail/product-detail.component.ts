import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { loadProduct } from '../../store/products.actions';
import { selectProductById } from '../../store/products.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product?: Product | null;
  loading = true;
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/products']);
      return;
    }
    this.store.dispatch(loadProduct({ id }));
    const selector = selectProductById(id);
    this.store.select(selector).pipe(takeUntil(this.destroy$)).subscribe(p => {
      this.product = p ?? null;
      this.loading = false;
    });
  }

  addToCart() {
    if (!this.product) return;
    if ((this.product.stock ?? 0) <= 0) {
      alert('Producto sin stock');
      return;
    }
    // ejemplo simple con localStorage (puedes integrar con tu store de cart)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((c: any) => c.product_id === this.product!.id);
    if (existing) {
      existing.quantity += 1;
      existing.subtotal = existing.quantity * (this.product!.price ?? 0);
    } else {
      cart.push({
        product_id: this.product.id,
        product_name: this.product.name,
        price: this.product.price || 0,
        quantity: 1,
        image_url: this.product.image_url || null,
        subtotal: this.product.price || 0
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito');
    this.router.navigate(['/cart']);
  }

  // método público para que la plantilla pueda navegar
  goBack() {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
