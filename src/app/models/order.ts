import { Product } from './product';

export class Order {
  _id: string
  product: Product;
  userId: string;

  constructor(_id, product, userId) {
    this._id = _id
    this.product = {
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      productImage: product.productImage,
      merchant_id: product.merchant_id,
      qty: product.qty
    }
    this.userId = userId;
  }
}