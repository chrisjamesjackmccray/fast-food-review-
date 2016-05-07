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
        this.locations = this._LocationsService.getLocations(this.user);
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
         console.log(this.places);
         this._$scope.$digest();
        }
    })
  }

}

// constructor() {
//   this.places = [];
//   this.place = "";
//   this.getCurrentLocation();
// }
//
// initMap() {
//   this.map = new google.maps.Map(document.querySelector('#map'), {
//     center: this.location,
//     zoom: 15
//   });
//
//   this.placeService = new google.maps.places.PlacesService(this.map);
// }
//
// getCurrentLocation() {
//   navigator.geolocation.getCurrentPosition((position) => {
//     this.location = { lat: position.coords.latitude, lng: position.coords.longitude };
//     this.initMap();
//   })
// }
//
// search() {
//   this.places = [];
//   this.placeService.nearbySearch({
//     location: this.location,
//         radius: 5000,
//         name: this.place,
//         type: ['restaurant']
//       }, (results, status) => {
//      if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//           if (!results[i].permanently_closed) {
//             this.places.push(results[i]);
//           }
//         }
//        console.log(this.places);
//       }
//   });
// }


export default LocationsController;
