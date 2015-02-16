'use strict';
 
angular.module('applicationApp')
  .config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('search', {
		url: "/search/:query?",
		templateUrl: 'app/search/search.html',
		controller: 'SearchCtrl',
		data:{}
	});
	
  });