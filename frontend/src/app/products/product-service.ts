import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product-model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  fetchProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.domain}/products`);
  }
  fetchProductById(id: string): Observable<Product>{
    return this.http.get<Product>(`${environment.domain}/products/${id}`)
  }
  deleteProductById(id: string): Observable<any>{
    return this.http.delete(`${environment.domain}/products/${id}`);
  }
  createProduct(product: Product): Observable<object>{
    return this.http.post(`${environment.domain}/products`, product);
  }
  updateProduct(id: string, product: Product): Observable<any>{
    return this.http.put(`${environment.domain}/products/${id}`, product);
  }
}
