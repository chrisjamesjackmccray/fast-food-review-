class SearchController {
  constructor() {
    this.places = [];
    this.place = "";
    this.getCurrentLocation();
  }

  initMap() {
    this.map = new google.maps.Map(document.querySelector('#map'), {
      center: this.location,
      zoom: 15
    });

    this.placeService = new google.maps.places.PlacesService(this.map);
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.location = { lat: position.coords.latitude, lng: position.coords.longitude };
      this.initMap();
    })
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
        }
    });
  }
}
