class RateController {
  constructor($state, UserService, LocationsService, $stateParams) {
    this._$state = $state;
    this._UserService = UserService;
    this._LocationsService = LocationsService;
    this.id = $stateParams.id;

    console.log($stateParams);

    this._UserService
    .isLoggedIn()
      .then((response) => {
        this.user = response;
      })
      .catch((error) => {
        this._$state.go("login");
      });

    this.rating = {
      wait_time: "",
      customer_service: "",
      stale: ""
    };
  }

  addRating() {
    this._LocationsService.rate(this.user, this.id, this.rating)
      .then((response) => {
        this._$state.go("locations");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default RateController;
