export class Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  qty: number;
  merchant_id: string;

  constructor(_id, name, description = '', price = 0, qty = 1, image = 'https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found-300x300.png', merchant_id) {
    this._id = _id
    this.name = name
    this.description = description
    this.price = price
    this.image = image
    this.qty = qty
    this.merchant_id = merchant_id
  }
}
