export class Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  productImage: string;

  constructor(_id, name, description = '', price = 0, productImage = 'https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found-300x300.png') {
    this._id = _id
    this.name = name
    this.description = description
    this.price = price
    this.productImage = productImage
  }
}
