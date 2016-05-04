class RegisterController {

  // import 'es6-promise';
  // import 'whatwg-fetch';
  //
  // navigator.geolocation.getCurrentPosition(function(position) {
  //   console.log(position);
  //   fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=75d92f502972a0f9ea05c1163aa5cbf4&units=imperial`)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((response) => {
  //     console.log(response);
  //   }
  // }

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
        this._$state.go("profile");
      })
      .catch((error) => {
        console.error(error);
      })

  }
}

export default RegisterController;
