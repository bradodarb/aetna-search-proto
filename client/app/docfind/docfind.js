'use strict';

angular.module('applicationApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/docfind', {
        templateUrl: 'app/docfind/docfind.html',
        controller: 'DocFindCtrl'
      });
  });