'use strict';

angular.module('applicationApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/medicare', {
        templateUrl: 'app/medicare/medicare.html',
        controller: 'MedicareCtrl'
      });
  });