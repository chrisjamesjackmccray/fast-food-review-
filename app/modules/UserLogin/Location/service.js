class LocationsService {
  constructor($firebaseArray) {
    this.ref = new Firebase("https://29-auth-services.firebaseio.com/");
    this._$firebaseArray = $firebaseArray;
  }

  getLocations(user) {
    this.locations = this._$firebaseArray(this.ref.child('users').child(user.uid).child('locations'));
    return this.locations;
  }

  new() {
  return {
     address: "",
     city: "",
     state: ""
  };
}

  all() {
    return this.locations;
  }

  add(item) {
    this.locations.$add(item);
  }
}

export default LocationsService
