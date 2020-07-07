import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { usersSignupUrl } from 'src/app/config/api';
import { usersLoginUrl } from 'src/app/config/api';
import { usersUrl } from 'src/app/config/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userRegistration(registerForm): Observable<any> {
    return this.http.post<any>(usersSignupUrl, registerForm);
  }

  userLogin(model) {
    return this.http.post<any>(usersLoginUrl, model);
  }

  userUpdate(userId, editUserForm) {
    return this.http.patch<any>(usersUrl + "/" + userId, editUserForm);
  }

  userDelete(userId) {
    return this.http.delete<any>(usersUrl + "/" + userId);
  }
}
