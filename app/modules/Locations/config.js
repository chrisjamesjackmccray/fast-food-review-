function config($stateProvider) {
  $stateProvider
  .state("locations", {
    url: '/locations',
    controller: 'LocationsController as locationsCtrl',
    template: require('./view.html')
  });
}

export default config;
