class RegisterController {


  constructor($state, UserService) {
    this._$state = $state;
    this._UserService = UserService;

    this.newUser = this._UserService.new();
  }

  register() {
    console.log("registering");
    console.log(this.newUser);
    this._UserService
      .create(this.newUser)
      .then((response) => {
        this._$state.go("locations");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}



export default RegisterController;
