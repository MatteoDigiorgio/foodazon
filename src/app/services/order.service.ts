import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from 'src/app/models/order';
import { ordersUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(userId): Observable<any> {
    return this.http.get<any>(ordersUrl + "/" + userId);
  }

  createOrder(cartItems, userId) {
    return this.http.post<any>(ordersUrl + "/" + userId, cartItems);
  }

  updateProductOrderStatus(params, userId) {
    return this.http.patch<any>(ordersUrl + "/" + userId, params);
  }

  deleteOrder(orderCode): Observable<any> {
    return this.http.delete<any>(ordersUrl + "/" + orderCode);
  }
}
