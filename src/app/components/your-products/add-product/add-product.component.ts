import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  model: any = {}

  file;

  isLoading = false;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) { }

  addProductForm = this.builder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern("[0-9]*")]],
    image: ['', Validators.required]
  })

  get price() {
    return this.addProductForm.get('price')
  }

  ngOnInit(): void {
  }

  onFileSelect(event) {
    this.file = event.target.files[0];
    this.addProductForm.get('image').setValue(this.file);
  }

  // add() {
  //   var user = JSON.parse(sessionStorage.getItem("user"));

  //   this.addProductForm.patchValue({
  //     name: this.model.name,
  //     description: this.model.description,
  //     price: this.model.price,
  //     image: this.addProductForm.get('image').value,
  //     token: JSON.parse(sessionStorage.getItem("Authorization")),
  //     merchant_id: user.userId
  //   });
  //   console.log(this.addProductForm.value)
  //   this.productService.addProduct(this.addProductForm.value).subscribe()
  // }

  add() {
    var user = JSON.parse(sessionStorage.getItem("user"));

    const formData = new FormData();
    formData.append('name', this.addProductForm.get('name').value);
    formData.append('description', this.addProductForm.get('description').value);
    formData.append('price', this.addProductForm.get('price').value);
    formData.append('image', this.addProductForm.get('image').value);
    formData.append('token', JSON.parse(sessionStorage.getItem("Authorization")));
    formData.append('merchant_id', user.userId);

    this.productService.addProduct(formData).subscribe();

    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate(['/shop']);

  }

  toggleLoading = () => {
    this.isLoading = true;
  }
}
