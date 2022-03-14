import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { isLogged$, isMerchant$ } from 'src/app/config/api';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editUserForm: FormGroup;

  isLogged = false;
  isMerchant = false;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private ref: ChangeDetectorRef,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let check = JSON.parse(sessionStorage.getItem("check"));
    if (check === "Auth successful") {
      if (user.isMerchant) {
        isMerchant$.next(true);
      }
      isLogged$.next(true);
    }

    this.buildForm()
    this.editUserForm.patchValue({
      username: user.username,
      email: user.email,
      password: user.email
    })
  }

  ngAfterViewInit() {
    isLogged$.subscribe(result => {
      this.isLogged = result;
      this.ref.detectChanges();
    });
    isMerchant$.subscribe(result => {
      this.isMerchant = result;
      this.ref.detectChanges();
    });
  }

  buildForm() {
    this.editUserForm = this.builder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      token: ''
    })
  }

  editUser() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    var token = JSON.parse(sessionStorage.getItem("Authorization"));
    this.editUserForm.patchValue({
      token: token
    })
    this.userService.userUpdate(user.userId, this.editUserForm.value).subscribe(res => {
      user.username = res.username;
      user.email = res.email
      sessionStorage.setItem("user", JSON.stringify(user));
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/shop'])
    });
  }

  logout() {
    sessionStorage.clear();
    this.isLogged = false;
  }

  deleteUser() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.userService.userDelete(user.userId).subscribe();
    sessionStorage.clear()
    isLogged$.next(false);
    isMerchant$.next(false);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/shop'])
  }
}
