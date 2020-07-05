import { environment } from 'src/environments/environment';

export const baseUrl = environment.production ? 'http://api.foodazon.com' : 'http://localhost:3000';
export const productsUrl = baseUrl + '/products';
export const cartUrl = baseUrl + '/cart';
export const usersSignupUrl = baseUrl + '/user/signup';
export const usersLoginUrl = baseUrl + '/user/login';

export class GlobalVars {
  public static isLogged: any = false;
  public static isMerchant: any = false;
}