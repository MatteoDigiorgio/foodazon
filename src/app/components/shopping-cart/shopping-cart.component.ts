import { Component, OnInit } from '@angular/core';
import { GlobalVars } from 'src/app/config/api';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  isLogged = GlobalVars.isLogged;

  constructor() { }

  ngOnInit(): void {
  }


}
