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

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ordersUrl);
  }

  createOrder(cartItems) {
    return this.http.post<any>(ordersUrl, cartItems);
  }

  deleteOrder(orderCode): Observable<any> {
    return this.http.delete<any>(ordersUrl + "/" + orderCode);
  }
}
