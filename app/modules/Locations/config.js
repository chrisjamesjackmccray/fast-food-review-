function config($stateProvider) {
  $stateProvider
  .state("locations", {
    url: '/',
    controller: 'LocationsController as locationsCtrl',
    template: require('./views/list.html')
  })
  .state("rate", {
    url: '/rate/:id',
    controller: 'RateController as rateCtrl',
    template: require('./views/rate.html')
  });
}

export default config;
