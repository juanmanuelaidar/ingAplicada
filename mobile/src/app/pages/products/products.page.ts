import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { ApiService, Product } from '../../services/api.service';

const PRODUCTS_CACHE_KEY = 'store-mobile.products';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  loading = false;
  offline = false;
  errorMessage = '';

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onRefresh(event: Event): void {
    this.loadProducts(event.target as HTMLIonRefresherElement);
  }

  loadProducts(refresher?: HTMLIonRefresherElement): void {
    this.loading = true;
    this.errorMessage = '';

    this.api
      .getProducts()
      .pipe(
        finalize(() => {
          this.loading = false;
          refresher?.complete();
        }),
      )
      .subscribe({
        next: products => {
          this.products = products;
          this.offline = false;
          localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(products));
        },
        error: () => {
          const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
          if (cached) {
            this.products = JSON.parse(cached) as Product[];
            this.offline = true;
            return;
          }

          this.products = [];
          this.errorMessage = 'No se pudieron cargar los productos.';
        },
      });
  }

  trackByProductId(_: number, product: Product): number {
    return product.id;
  }
}
