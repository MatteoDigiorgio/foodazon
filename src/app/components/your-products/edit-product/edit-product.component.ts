import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editProductForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.editProductForm = this.builder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      token: ''
    })
  }

  findProduct() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    var token = JSON.parse(sessionStorage.getItem("Authorization"));
    this.productService.findProduct(((document.getElementById("productCodeForEdit") as HTMLInputElement).value)).subscribe(res => {
      if (res.merchant_id === user.userId) {
        this.editProductForm.patchValue({
          name: res.name,
          price: res.price,
          description: res.description,
          token: token
        })
      } else {
        console.log("It's not your product")
      }
    })
  }



  editProduct() {
    this.productService.editProduct(((document.getElementById("productCodeForEdit") as HTMLInputElement).value), this.editProductForm.value).subscribe();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/shop']);
  }
}
