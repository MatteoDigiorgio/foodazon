import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserService } from 'src/app/services/user.service';
import { GlobalVars } from 'src/app/config/api';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {}

  authFailed;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authFailed = false;
  }


  login() {
    this.userService.userLogin(this.model).subscribe(res => {
      if (res.message === "Auth successful") {
        GlobalVars.isLogged = true;
        if (res.isMerchant) {
          GlobalVars.isMerchant = true;
        }
        this.router.navigate(['/shop']);
      } else if (res.message === "Auth failed") {
        this.authFailed = true;
      }
    })
  }
}
