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
  });
}

export default config;
