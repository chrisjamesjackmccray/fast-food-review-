
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import firebase from 'firebase';
import angularFire from 'angularfire';
import angularScroll from 'angular-scroll';

import locations from './modules/Locations';

import user from './modules/user';


let App = angular.module('app', [
  'ui.router',
  'firebase',
  'duScroll',
  'tiy.user',
  'tiy.locations',
  'ngMap',
]);

function config($urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
}

App.value('duScrollOffset', 60);


App.config(config);
