import { Component, OnInit, NgModule } from '@angular/core';

import { Product } from 'src/app/models/product'
import { ProductService } from 'src/app/services/product.service';
import { textInSearchbox } from 'src/app/config/api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProductsFromDatabase();
  }


  getProductsFromDatabase() {
    this.productService.getProducts(textInSearchbox.value).subscribe((products) => {
      this.productList = products['products'];
    })
  }

}
