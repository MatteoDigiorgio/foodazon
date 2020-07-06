import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { GlobalVars } from 'src/app/config/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {}

  user: User;

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
      var user = {
        userId: res.userId,
        username: res.username,
        email: res.email,
        isMerchant: res.isMerchant
      }
      var message = res.message
      sessionStorage.setItem("check", JSON.stringify(message))
      sessionStorage.setItem("user", JSON.stringify(user))
      sessionStorage.setItem("Authorization", JSON.stringify(res.token))

      if (message === "Auth successfum") {
        if (user.isMerchant) {
          GlobalVars.isMerchant = true;
        }
        GlobalVars.isLogged = true;
        this.router.navigate(['/shop']);
      } else if (message === "Auth failed") {
        this.authFailed = true;
      }
    })
  }
}
