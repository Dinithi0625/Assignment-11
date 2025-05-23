export default class LoginModel {
  constructor() {
    this.username = '';
    this.password = '';
  }

  setUsername(username) {
    this.username = username;
  }

  setPassword(password) {
    this.password = password;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }
}