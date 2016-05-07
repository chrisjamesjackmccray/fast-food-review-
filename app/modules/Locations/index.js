import angular from 'angular';

import config from './config';
import listController from './controllers/list';
import rateController from './controllers/rate';
import service from './service';

let locations = angular.module('tiy.locations', []);

locations.config(config);
locations.controller('LocationsController', listController);
locations.controller('RateController', rateController);
locations.service('LocationsService', service);


export default locations;
