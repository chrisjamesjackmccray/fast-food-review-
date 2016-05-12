function config($stateProvider) {
  $stateProvider
  .state("locations", {
    url: '/?search',
    controller: 'LocationsController as locationsCtrl',
    template: require('./views/list.html')
  })
  .state("rate", {
    url: '/rate/:id?search',
    controller: 'RateController as rateCtrl',
    template: require('./views/rate.html')
  })
  .state("about", {
    url: '/about',
    controller: 'AboutController as aboutCtrl',
    template: require('./views/about.html')
  });
}

export default config;
