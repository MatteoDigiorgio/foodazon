import { Injectable } from '@angular/core';

import { ProductListComponent } from 'src/app/components/shopping-cart/product-list/product-list.component';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {

  constructor(public productListComponent: ProductListComponent) { }

  reload() {
    this.productListComponent.getProductFromDatabase();
  }
}
