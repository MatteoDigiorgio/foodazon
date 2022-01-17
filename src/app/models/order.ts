import { Product } from './product';

export class Order {
  _id: string
  date: Date
  userId: string
  product: [Product]
  total: number

  constructor(_id, date, userId, product, total) {
    this._id = _id
    this.date = date
    this.userId = userId
    this.product.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      merchant_id: product.merchant_id,
      qty: product.qty
    })
    this.total = total
  }
}