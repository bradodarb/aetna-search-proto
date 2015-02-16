'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider.state('medicare', {
		url: "/medicare",
		templateUrl: 'app/medicare/medicare.html',
		controller: 'MedicareCtrl',
		data:{}
	})
	.state('medicare.home', {
		url: "/home",
		templateUrl: 'app/medicare/partials/main.html'
	})
	.state('medicare.doctor-zipCode', {
		url: "/medicare/zip",
		templateUrl: 'app/medicare/partials/doctorAndZip.html'
	})
	.state('medicare.doctor-planType', {
		url: "/medicare/select-plan",
		templateUrl: 'app/medicare/partials/selectPlan.html'
	})
	.state('medicare.doctor-results', {
		url: "/medicare/results",
		templateUrl: 'app/medicare/partials/results.html'
	})
	.state('medicare.doctor-loading', {
		url: "/medicare/results/loading",
		templateUrl: 'app/medicare/partials/loading.html'
	})
	
	.state('medicare.find-drugs', {
		url: "/medicare/perscriptions",
		templateUrl: 'app/medicare/partials/find-drugs.html'
	})

	.state('medicare.login', {
		url: "/medicare/login",
		templateUrl: 'app/medicare/partials/login.html'
	});
	
  });