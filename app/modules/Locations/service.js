class LocationsService {
  constructor($firebaseArray, $firebaseObject) {
    this.ref = new Firebase("https://29-auth-services.firebaseio.com/");
    this._$firebaseArray = $firebaseArray;
    this._$firebaseObject = $firebaseObject;
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

  rate(user, id, rating) {
    let myRating = this._$firebaseObject(this.ref.child('restaurants').child(id).child(user.uid))
    myRating.$value = rating;
    return myRating.$save();
  }

}

export default LocationsService
