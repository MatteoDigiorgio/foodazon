import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() order: Order;

  localeDate;

  URL = 'http://localhost:3000/';

  user = JSON.parse(sessionStorage.getItem("user"));

  constructor(
    private router: Router,
    private orderService: OrderService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }



  ngOnInit(): void {
    this.localeDate = new Date(this.order.date).toLocaleString().split(",")[0]
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }

  changeProductOrderStatus(i, newStatus) {
    var params = {
      orderCode: this.order._id,
      productCode: this.order.product[i].productId,
      newStatus: newStatus
    }
    this.orderService.updateProductOrderStatus(params, this.user.userId).subscribe()
    this.reloadComponent()
  }

  deleteOrder() {
    if (!this.user.isMerchant) {
      this.orderService.deleteOrder(this.order._id).subscribe()
      this.reloadComponent();
    }
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/orders']);
  }
}
