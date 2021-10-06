import { Component, OnInit } from '@angular/core';
import { isLogged$, isMerchant$ } from 'src/app/config/api';
import { ChangeDetectorRef } from '@angular/core';

import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];

  cartTotal = 0;

  isLogged = false;
  isMerchant = false;


  constructor(
    private msg: MessengerService,
    private ref: ChangeDetectorRef,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product);
    })
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

  addProductToCart(product: Product) {

    let productExists = false;

    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product._id) {
        this.cartItems[i].qty++;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        productId: product._id,
        name: product.name,
        qty: 1,
        price: product.price,
        merchant_id: product.merchant_id
      });
    }
    this.calcCartTotal();
  }

  onIncreaseCartItemQty(event) {
    this.calcCartTotal();
  }

  onDecreaseCartItemQty(event) {
    this.calcCartTotal();
  }

  onDeleteCartItem(event) {
    var itemToDelete
    for (var item of this.cartItems) {
      if (item.productId === event) {
        itemToDelete = this.cartItems.indexOf(item);
      }
    }
    this.cartItems.splice(itemToDelete, 1);
    this.calcCartTotal();
  }


  calcCartTotal() {
    this.cartTotal = 0;
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price);
    });
  }

  createOrder() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    var token = JSON.parse(sessionStorage.getItem("Authorization"));
    this.cartItems.forEach(element => {
      var order = {
        product: element,
        userId: user.userId,
        token: token
      }
      this.orderService.createOrder(order).subscribe()
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/orders']);
  }
}

