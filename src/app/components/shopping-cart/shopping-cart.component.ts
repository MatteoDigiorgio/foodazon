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
    let check = JSON.parse(sessionStorage.getItem("check"));
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (check === "Auth successful") {
      if (user.isMerchant) {
        GlobalVars.isMerchant = true;
      }
      GlobalVars.isLogged = true;
    }
  }


}
