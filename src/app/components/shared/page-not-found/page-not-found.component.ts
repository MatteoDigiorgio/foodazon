import { Component, OnInit } from '@angular/core';
import { isLogged$, isMerchant$ } from 'src/app/config/api';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  isLogged = false;
  isMerchant = false;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    let check = JSON.parse(sessionStorage.getItem("check"));
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (check === "Auth successful") {
      if (user.isMerchant) {
        isMerchant$.next(true);
      }
      isLogged$.next(true);
    }
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
