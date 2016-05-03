class LocationsController {

  constructor(UserService, LocationsService) {
    this._UserService = UserService;
    this._LocationsService = LocationsService;

    this.newLocation = this._LocationsService.new();
    console.log(this.newLocation);

    this._UserService
    .isLoggedIn()
      .then((response) => {
        this.user = response;
        this.locations = this._LocationsService.getLocations(this.user);
      })

      .catch((error) => {
        this._$state.go("login");
      });

  }

  addLocation() {
    console.log(this.newLocation);
    this._LocationsService.add(this.newLocation);
    this.newLocation = this._LocationsService.new();
  }
}

export default LocationsController;
