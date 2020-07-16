import { Product } from 'src/app/models/product';

export class CartItem {
  id: number;
  productId: number;
  name: string;
  qty: number;
  price: number;

  constructor(id: number, product: Product, qty = 1) {
    this.id = id;
    this.productId = product._id;
    this.name = product.name;
    this.price = product.price;
    this.qty = qty;
  }
}
