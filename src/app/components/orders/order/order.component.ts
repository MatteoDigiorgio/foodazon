import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';

import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }


  ngOnInit(): void {
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.order._id).subscribe()
    this.reloadComponent();
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/orders']);
  }
}
