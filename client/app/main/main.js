'use strict';


angular.module('applicationApp')
  .config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider.state('main', {
		url: "/",
		templateUrl: 'app/main/main.html',
		controller: 'MainCtrl',
		data:{}
	});
	
  });