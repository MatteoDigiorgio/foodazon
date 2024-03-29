import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { productsUrl } from 'src/app/config/api';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient) { }

  getProducts(textTyped): Observable<any> {
    return this.http.get<any>(productsUrl + "/" + textTyped);
  }

  addProduct(addProductForm): Observable<any> {
    return this.http.post<any>(productsUrl, addProductForm);
  }

  findProduct(productCode): Observable<Product> {
    return this.http.get<Product>(productsUrl + "/" + productCode);
  }

  deleteProduct(productCode): Observable<any> {
    return this.http.delete<any>(productsUrl + "/" + productCode);
  }

  editProduct(productCode, editProductForm): Observable<any> {
    return this.http.patch<any>(productsUrl + "/" + productCode, editProductForm);
  }
}
