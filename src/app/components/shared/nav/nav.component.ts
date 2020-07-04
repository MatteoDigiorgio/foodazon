import { Component, OnInit } from '@angular/core';
import { GlobalVars } from 'src/app/config/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged = GlobalVars.isLogged;
  isMerchant = GlobalVars.isMerchant;

  constructor() { }

  ngOnInit(): void {
  }


}


