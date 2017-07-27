
var angular = require('angular');

angular.module("fswd", [require('./registration').name, require('angular-route/index')])

angular.bootstrap(document, ['fswd']);
