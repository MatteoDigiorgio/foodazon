import { Component, OnInit } from '@angular/core';
import { isLogged$, isMerchant$, textInSearchbox } from 'src/app/config/api';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged = false;
  isMerchant = false;
  username;
  textInSearchbox;

  constructor(
    private ref: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.username = user.username;
  }

  search() {
    console.log(textInSearchbox.value.length)
    textInSearchbox.next(((document.getElementById("textTyped") as HTMLInputElement).value))
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/shop'])
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
    textInSearchbox.subscribe(result => {
      this.textInSearchbox = result;
      this.ref.detectChanges();
    })
  }
}


