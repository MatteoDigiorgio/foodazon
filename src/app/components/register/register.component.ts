import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { isLogged$, isMerchant$ } from 'src/app/config/api';

/**
 * 
 * @param form 
 */
function passwordsMatchValidator(form) {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsMatch: true });
  } else {
    confirmPassword.setErrors(null);
  }

  return null;
}

function symbolValidator(control) { //control = registerForm.get('password')
  var regex = /[!@#$%^&*(),.?":{}|<>]/;
  if (regex.test(control.value)) {
    return null;
  } else {
    return { symbol: true };
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, symbolValidator, Validators.minLength(4)]],
      confirmPassword: '',
      isMerchant: false
    }, {
      validators: passwordsMatchValidator
    })
  }

  register() {
    this.userService.userRegistration(this.registerForm.value).subscribe(res => {
      var user = {
        userId: res._id,
        username: res.username,
        email: res.email,
        isMerchant: res.isMerchant
      }


      sessionStorage.setItem("check", JSON.stringify(res.message))
      sessionStorage.setItem("user", JSON.stringify(user))
      sessionStorage.setItem("Authorization", JSON.stringify(res.token))


      isLogged$.next(true);
      if (res.isMerchant) {
        isMerchant$.next(true);
      }
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/shop']);
    });

  }

}
