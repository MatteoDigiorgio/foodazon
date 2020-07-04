import { Component, OnInit } from '@angular/core';
import { GlobalVars } from 'src/app/config/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {}

  constructor() { }

  ngOnInit(): void {
  }


  login() {
  }
}
