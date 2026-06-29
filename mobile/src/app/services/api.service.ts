import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category?: {
    id: number;
    name: string;
  } | null;
}

export interface ProductCategory {
  id: number;
  name: string;
  description?: string | null;
}

interface AuthResponse {
  id_token: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;
  private token?: string;

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.withAuthHeaders().pipe(switchMap(headers => this.http.get<Product[]>(`${this.baseUrl}/products`, { headers })));
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.withAuthHeaders().pipe(switchMap(headers => this.http.get<ProductCategory[]>(`${this.baseUrl}/product-categories`, { headers })));
  }

  private withAuthHeaders(): Observable<HttpHeaders> {
    return this.getToken().pipe(map(token => new HttpHeaders({ Authorization: `Bearer ${token}` })));
  }

  private getToken(): Observable<string> {
    if (this.token) {
      return new Observable(observer => {
        observer.next(this.token);
        observer.complete();
      });
    }

    return this.http
      .post<AuthResponse>(`${this.baseUrl}/authenticate`, {
        username: 'admin',
        password: 'admin',
      })
      .pipe(
        map(response => response.id_token),
        tap(token => {
          this.token = token;
        }),
      );
  }
}
