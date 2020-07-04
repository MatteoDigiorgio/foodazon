import { environment } from 'src/environments/environment';

export const baseUrl = environment.production ? 'http://api.foodazon.com' : 'http://localhost:3000';
export const productsUrl = baseUrl + '/products';
export const cartUrl = baseUrl + '/cart';
export const usersUrl = baseUrl + '/user/signup';

export class GlobalVars {
  public static isLogged: any = false;
  public static isMerchant: any = false;
}