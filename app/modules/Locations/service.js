class LocationsService {
  constructor($q, $firebaseArray, $firebaseObject) {
    this._$q = $q;
    this.ref = new Firebase("https://29-auth-services.firebaseio.com/");
    this._$firebaseArray = $firebaseArray;
    this._$firebaseObject = $firebaseObject;

    this.locations = $firebaseArray(this.ref.child('restaurants'));
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

  avgWaitTime(id) {

    return new this._$q((resolve, reject) => {

      let totalWaitTime = 0;
      let avg = 'Not Rated Yet';

      let restaurant = this._$firebaseArray(this.ref.child('restaurants').child(id));

      restaurant.$loaded()
        .then((response) => {

          if (response.length > 0) {
            response.forEach((rating) => {
              console.log("wait time");
              console.log(rating);
              totalWaitTime += Number(rating.wait_time)
            });

            avg = (totalWaitTime / response.length);

            if (avg === 2) {
              avg = "2"
            }
            else if (avg >= 5) {
              avg = "5"
            }
            else if (avg >= 10) {
              avg = "10"
            }
            else {
              avg = "15"
            }

            avg = (totalWaitTime / response.length) + " minutes";
          }
          else {
            avg = "Not rated yet"
          }


          resolve(avg);
          console.log(avg);
        })
        .catch((error) => {
          reject(error);
        })

    })
  }

  avgCustomerService(id) {

    return new this._$q((resolve, reject) => {

      let totalCustomerService = 0;
      let avg = 'Not Rated Yet';

      let restaurant = this._$firebaseArray(this.ref.child('restaurants').child(id));

      restaurant.$loaded()
        .then((response) => {

          if (response.length > 0) {
            response.forEach((rating) => {
              console.log(rating);
              totalCustomerService += Number(rating.customer_service)
            });

            avg = (totalCustomerService / response.length);

            if (avg === 4) {
              avg = "Very Good"
            }
            else if (avg >= 3) {
              avg = "Good"
            }
            else if (avg >= 2) {
              avg = "Bad"
            }
            else {
              avg = "Very Bad"
            }
          }
          else {
            avg = "Not rated yet"
          }

          resolve(avg);
          console.log(avg);
        })
        .catch((error) => {
          reject(error);
        })

    })
  }

  avgStale(id) {

    return new this._$q((resolve, reject) => {

      let totalStale = 0;
      let avg = 'Not Rated Yet';

      let restaurant = this._$firebaseArray(this.ref.child('restaurants').child(id));

      restaurant.$loaded()
        .then((response) => {
          if (response.length > 0) {
            response.forEach((rating) => {
              console.log(rating);
              totalStale += Number(rating.stale)
            });

            avg = (totalStale / response.length);

            if (avg === 4) {
              avg = "Poor"
            }
            else if (avg >= 3) {
              avg = "Average"
            }
            else if (avg >= 2) {
              avg = "Good"
            }
            else {
              avg = "Excellent"
            }
          }
          else {
            avg = "Not rated yet"
          }


          resolve(avg);
          console.log(avg);
        })
        .catch((error) => {
          reject(error);
        })

    })
  }
}

export default LocationsService
