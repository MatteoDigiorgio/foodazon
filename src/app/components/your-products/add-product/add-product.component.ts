import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
// import { ReloadService } from 'src/app/services/reload.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private productService: ProductService,
    // private reloadService: ReloadService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.addProductForm = this.builder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: '',
      token: '',
      merchant_id: ''
    })
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.addProductForm.get('image').setValue(file);
  }

  add() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    const formData = new FormData();
    formData.append('name', this.addProductForm.get('name').value);
    formData.append('description', this.addProductForm.get('description').value);
    formData.append('price', this.addProductForm.get('price').value);
    formData.append('file', this.addProductForm.get('image').value);
    formData.append('token', JSON.parse(sessionStorage.getItem("Authorization")));
    formData.append('merchant_id', user.userId);
    this.productService.addProduct(formData).subscribe();
    // this.reloadService.reload();
    this.router.navigate(['/shop']);
  }
}
