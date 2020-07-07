import { Observable } from 'rxjs';
import { Product } from './product';

export class Order {
  id: number;
  products: [];
  status: string;

  constructor(id: number, products: [], status = "In Treatment") {
    this.id = id;
    this.products = []
    this.status = status;
  }
}