import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: any;

  @Output() increaseCartItemQty = new EventEmitter();
  @Output() decreaseCartItemQty = new EventEmitter();
  @Output() deleteCartItem = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  increaseQuantity() {
    this.cartItem.qty++;
    this.increaseCartItemQty.emit(this.cartItem.qty);
  }

  decreaseQuantity() {
    this.cartItem.qty--;
    this.decreaseCartItemQty.emit(this.cartItem.qty);
  }

  deleteItem() {
    this.deleteCartItem.emit(this.cartItem.productId);
  }

}
