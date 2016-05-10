class LocationsController {

  constructor(UserService, LocationsService, $state, NgMap, $scope) {
    this._NgMap = NgMap;
    this._UserService = UserService;
    this._LocationsService = LocationsService;
    this._$state = $state;
    this._$scope = $scope;


    this.places = [];
    this.place = "";
    this.location = { lat: "", lng: "" };

    this.newLocation = this._LocationsService.new();
    console.log(this.newLocation);

    this._UserService
    .isLoggedIn()
      .then((response) => {
        this.user = response;
        this.getCurrentLocation();
      })

      .catch((error) => {
        this._$state.go("login");
      });
  }

  logout() {
    this._UserService.logout();
    this._$state.go("login");
  }


  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.location = { lat: position.coords.latitude, lng: position.coords.longitude };

      this._NgMap.getMap().then((map) => {
        this.placeService = new google.maps.places.PlacesService(map);
      });

    });
  }

  addLocation() {
    console.log(this.newLocation);
    this._LocationsService.add(this.newLocation);
    this.newLocation = this._LocationsService.new();
  }

  avgWaitTime(restaurant) {
    this._LocationsService.avgWaitTime(restaurant.id)
      .then((response) => {
        restaurant.avgWaitTime = response;
      });
  }

  calculateAverages() {
    this.places.forEach((place) => {
      this.avgWaitTime(place);
      this.avgStale(place);
      this.avgCustomerService(place);
    });
  }



  avgStale(restaurant) {
    this._LocationsService.avgStale(restaurant.id)
      .then((response) => {
        restaurant.avgStale = response;
      });
  }


  avgCustomerService(restaurant) {
    this._LocationsService.avgCustomerService(restaurant.id)
      .then((response) => {
        restaurant.avgCustomerService = response;
      });
  }

  search() {
    this.places = [];
    this.placeService.nearbySearch({
      location: this.location,
          radius: 5000,
          name: this.place,
          type: ['restaurant']
        }, (results, status) => {
       if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            if (!results[i].permanently_closed) {
              this.places.push(results[i]);
            }
          }
          this.calculateAverages();
        //  this._$scope.$digest();
        }
    })
  }
}

export default LocationsController;
