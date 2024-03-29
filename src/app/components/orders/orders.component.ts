import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { isLogged$, isMerchant$ } from 'src/app/config/api';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  isLogged = false;
  isMerchant = false;

  orderList: Order[] = [];

  constructor(
    private ref: ChangeDetectorRef,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    let check = JSON.parse(sessionStorage.getItem("check"));
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (check === "Auth successful") {
      if (user.isMerchant) {
        isMerchant$.next(true);
      }
      isLogged$.next(true);
    }
    this.ngAfterViewInit();
    this.getOrdersFromDatabase();
  }

  ngAfterViewInit() {
    isLogged$.subscribe(result => {
      this.isLogged = result;
      this.ref.detectChanges();
    });
    isMerchant$.subscribe(result => {
      this.isMerchant = result;
      this.ref.detectChanges();
    });
  }

  getOrdersFromDatabase() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.orderService.getOrders(user.userId).subscribe((orders) => {
      orders.forEach(order => {
        this.orderList.unshift({
          _id: order._id,
          date: order.date,
          userId: order.userId,
          product: order.product,
          total: order.total
        })
      });
    })
  }
}
