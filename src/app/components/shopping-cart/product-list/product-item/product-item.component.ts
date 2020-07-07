import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { isLogged$, isMerchant$ } from 'src/app/config/api';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product

  URL = 'http://localhost:3000/';

  isLogged = false;
  isMerchant = false;

  constructor(
    private msg: MessengerService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
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

  handleAddToCart() {
    this.msg.sendMsg(this.productItem);
  }

}
