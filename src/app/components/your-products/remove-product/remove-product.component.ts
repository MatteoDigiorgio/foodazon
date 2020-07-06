import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {

  model: any = {}

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
  }
  // SISTEMARE AUTENTICAZONE
  delete() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    // const formData = new FormData();
    // formData.append('productCode', this.model.productCode);
    // formData.append('token', JSON.parse(sessionStorage.getItem("Authorization")));
    // console.log(formData)
    this.productService.findProduct(this.model.productCode).subscribe(res => {
      if (res.merchant_id === user.userId) {
        this.productService.deleteProduct(this.model.productCode).subscribe()
        console.log("fatto")
      } else {
        console.log("non puoi")
      }
    })
  }
}

