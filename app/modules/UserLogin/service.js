class UserService {
  constructor($q, $firebaseAuth) {
    this._$q = $q;
    this.ref = new Firebase("https://29-auth-services.firebaseio.com/");
    this.auth = $firebaseAuth(this.ref);
  }

  isLoggedIn() {
    return new this._$q((resolve, reject) => {

      let authData = this.auth.$getAuth();

      if (authData) {
        this.user = authData;
        resolve(this.user);
      }
      else {
        this.user = undefined;
        reject("Logged out");
      }
    })
  }

  login(user) {
    return new this._$q((resolve, reject) => {
      this.auth.$authWithPassword(user)
       .then((response) =>  {
         console.log(response);
        this.user = response;
        resolve(this.user);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  logout() {
    this.auth.$unauth();
  }

  new() {
    return {
      email: "",
      password: ""
    };
  }

  create(user) {
    return new this._$q((resolve, reject) => {
      this.auth.$createUser(user)
      .then((response) => {
        return this.auth.$authWithPassword(user);
      })
       .then((response) =>  {
        this.user = response;
        resolve(this.user);
      })
      .catch((error) => {
        reject(error);
      })
    });
  }
}

export default UserService;
