import { Component, OnInit } from '@angular/core';
import { GlobalVars } from 'src/app/config/api';

import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];

  cartTotal = 0;

  isLogged = GlobalVars.isLogged;

  constructor(
    private msg: MessengerService,
    //private cartService: CartService
  ) { }

  ngOnInit() {
    // this.loadCartItems();
    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product);
    })
  }


  // loadCartItems() {
  //   this.cartService.getCartItems().subscribe((items: CartItem[]) => {
  //     console.log(items);
  //   })
  // }

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
        productName: product.name,
        qty: 1,
        price: product.price
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

  }
}

