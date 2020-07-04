import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { usersUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userRegistration(registerForm): Observable<any> {
    return this.http.post<any>(usersUrl, registerForm);
  }
}
