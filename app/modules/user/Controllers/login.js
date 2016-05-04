class LoginController {
  constructor($state, UserService) {
    this._$state = $state;
    this._UserService = UserService;
    this.user = this._UserService.new();
  }

  login() {
    this._UserService
      .login(this.user)
      .then((response) => {
        this._$state.go("locations");
      });
  }

  logout() {
    this._UserService
      .logout(this.user)
      .then((response) => {
        this._$state.go("login");
      });
  }
}

export default LoginController;
