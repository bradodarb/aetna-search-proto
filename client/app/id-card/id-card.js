'use strict';

angular.module('applicationApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/id-card', {
        templateUrl: 'app/id-card/id-card.html',
        controller: 'IdCardCtrl'
      });
  });