import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

export const baseUrl = environment.production ? 'http://api.foodazon.com' : 'http://localhost:3000';
export const productsUrl = baseUrl + '/products';
export const cartUrl = baseUrl + '/cart';
export const usersSignupUrl = baseUrl + '/user/signup';
export const usersLoginUrl = baseUrl + '/user/login';
export const usersUrl = baseUrl + '/user';

export const isLogged$ = new BehaviorSubject(false);
export const isMerchant$ = new BehaviorSubject(false);

