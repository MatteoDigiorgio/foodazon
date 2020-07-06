export class User {
  _id: number;
  username: string;
  email: string;
  isMechant: boolean;
  token: string;

  constructor(_id, nausername, email, isMechant, token) {
    this._id = _id
    this.username = this.username
    this.email = email
    this.isMechant = isMechant
    this.token = token
  }
}