import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartItem } from 'src/app/models/cart-item';
import { cartUrl } from 'src/app/config/api';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // getCartItems(): Observable<CartItem[]> {
  //   //TODO: Mapping the obtain result to our CartItem props.
  //   return this.http.get<CartItem[]>(cartUrl).pipe(
  //     map((result: any[]) => {

  //       var resultArray = Object.entries(result);
  //       resultArray.forEach(([key, value]) => {
  //         result = value
  //       });
  //       console.log(result)

  //       let cartItems: CartItem[] = [];

  //       for (let item of result) {
  //         let productExists = false;

  //         for (let i in cartItems) {
  //           if (cartItems[i].productId === item.productId) {
  //             cartItems[i].qty++;
  //             productExists = true;
  //             break;
  //           }
  //         }

  //         if (!productExists) {
  //           cartItems.push(new CartItem(item.id, item.productId));
  //         }
  //       }

  //       return cartItems;
  //     })
  //   );
  // }

  // addProductToCart(product: Product): Observable<any> {
  //   return this.http.post(cartUrl, product)
  // }
}
