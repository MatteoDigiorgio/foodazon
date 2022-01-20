import { Component, OnInit } from '@angular/core';
import { isLogged$, isMerchant$ } from 'src/app/config/api';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged = false;
  isMerchant = false;
  username;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.username = user.username;
  }

  logout() {
    sessionStorage.clear();
    this.isLogged = false;
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
}


