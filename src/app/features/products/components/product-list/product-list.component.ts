import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../../../core/services/products.service';
import { CategoriesService, Category } from '../../../../core/services/categories.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { loadProducts } from '../../store/products.actions';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../../core/models/product.model';
import { selectAllProducts } from '../../store/products.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  product: Product[] = [];
  loading = true;
  error: string | null = null;

  categoryOptions: Category[] = [];
  selectedMainCategoryId: number | null = null;
  selectedSubcategoryId: number | null = null;
  selectedOptionValue = '';
  limit = 10;
  offset = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store, 
    private router: Router,  
    private productsService: ProductsService,
    private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();

    this.store.select(selectAllProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe(product => {
        this.product = product || [];
        this.loading = false;
      });
  }

  private loadCategories(): void {
    this.categoriesService.getAll().subscribe({
      next: (categories) => {
        this.categoryOptions = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.error = 'Error al cargar categorías';
      }
    });
  }

  private loadProducts(): void {
    this.loading = true;
    let categories: number[] | undefined;

    if (this.selectedSubcategoryId) {
      categories = [this.selectedSubcategoryId];
      if (this.selectedMainCategoryId) {
        categories.unshift(this.selectedMainCategoryId);
      }
    } else if (this.selectedMainCategoryId) {
      categories = [this.selectedMainCategoryId];
    }

    this.store.dispatch(loadProducts({ categories, limit: this.limit, offset: this.offset }));
  }

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.selectedOptionValue = value;
    this.selectedMainCategoryId = null;
    this.selectedSubcategoryId = null;

    if (value) {
      const parts = value.split(':');
      if (parts[0] === 'all') {
        if (parts[1] === 'sub' || parts[1] === 'accessory') {
          this.selectedSubcategoryId = Number(parts[2]);
        }
      } else if (parts[0] === 'main') {
        this.selectedMainCategoryId = Number(parts[1]);
        if (parts[2] === 'sub' || parts[2] === 'accessory') {
          this.selectedSubcategoryId = Number(parts[3]);
        }
      }
    }

    this.offset = 0;
    this.loadProducts();
  }

  clearFilters(): void {
    this.selectedOptionValue = '';
    this.selectedMainCategoryId = null;
    this.selectedSubcategoryId = null;
    this.offset = 0;
    this.loadProducts();
  }

  get selectedCategoryNames(): string {
    if (this.selectedOptionValue === 'all:root') {
      return 'Todas';
    }

    if (!this.selectedMainCategoryId && !this.selectedSubcategoryId) {
      return 'Todos los productos';
    }

    const mainCategory = this.categoryOptions.find(category => category.id === this.selectedMainCategoryId);
    const mainName = mainCategory ? mainCategory.name : '';
    const subCategory = this.categoryOptions.find(category => category.id === this.selectedSubcategoryId);
    const subName = subCategory ? subCategory.name : '';

    if (this.selectedSubcategoryId) {
      return mainName ? `${mainName}: ${subName}` : subName;
    }

    return mainName;
  }

  get currentSubcategoryOptions(): Category[] {
    const subIds = this.getSubcategoryIdsForMain(this.selectedMainCategoryId);
    return this.categoryOptions.filter(category => subIds.includes(category.id));
  }

  getCategoryName(id: number): string {
    return this.categoryOptions.find(category => category.id === id)?.name || '';
  }

  get currentAccessoryOptions(): Category[] {
    return this.categoryOptions.filter(category => this.getAccessorySubcategoryIdsForMain(this.selectedMainCategoryId).includes(category.id));
  }

  getSubcategoryIdsForMain(mainCategoryId: number | null): number[] {
    if (mainCategoryId === 1) {
      return [3, 5, 6, 7, 8, 9, 10, 13, 14, 15];
    }

    if (mainCategoryId === 2) {
      return [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    }

    return this.categoryOptions
      .filter(category => category.name !== 'Hombre' && category.name !== 'Mujer' && category.name !== 'Accesorios')
      .filter(category => !this.getAccessorySubcategoryIdsForMain(null).includes(category.id))
      .map(category => category.id);
  }

  getAccessorySubcategoryIdsForMain(mainCategoryId: number | null): number[] {
    if (mainCategoryId === 1) {
      return [17, 18, 19, 20];
    }

    if (mainCategoryId === 2) {
      return [17, 18, 19, 20, 16];
    }

    return [17, 18, 19, 20, 16];
  }

  previousPage(): void {
    if (this.offset <= 0) {
      return;
    }
    this.offset = Math.max(0, this.offset - this.limit);
    this.loadProducts();
  }

  nextPage(): void {
    this.offset += this.limit;
    this.loadProducts();
  }

    addToCart(product: Product) {
    if (!product) return;
    if ((product.stock ?? 0) <= 0) {
      alert('Producto sin stock');
      return;
    }

    // ejemplo simple con localStorage (puedes integrar con tu store de cart)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((c: any) => c.product_id === product.id);
    if (existing) {
      existing.quantity += 1;
      existing.subtotal = existing.quantity * (product.price ?? 0);
    } else {
      cart.push({
        product_id: product.id,
        product_name: product.name,
        price: product.price || 0,
        quantity: 1,
        image_url: product.image_url || null,
        subtotal: product.price || 0
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto añadido al carrito');
    this.router.navigate(['/cart']);
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
