'use strict';

angular.module('applicationApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/search/:query?', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchCtrl'
      });
  });