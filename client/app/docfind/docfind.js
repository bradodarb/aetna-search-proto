'use strict';


angular.module('applicationApp')
	.config(function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('docfind', {
				url: "/docfind",
				templateUrl: 'app/docfind/docfind.html',
				controller: 'DocFindCtrl',
				data:{}
			})
			.state('docfind.home', {
				url: "/home",
				templateUrl: 'app/docfind/partials/main.html'
			})
			
			.state('docfind.doctor-login', {
				url: "/doctor/login",
				templateUrl: 'app/docfind/partials/doctor/login.html'
			})
			.state('docfind.doctor-zipCode', {
				url: "/doctor/zip",
				templateUrl: 'app/docfind/partials/doctor/doctorAndZip.html'
			})
			.state('docfind.doctor-planType', {
				url: "/doctor/select-plan",
				templateUrl: 'app/docfind/partials/doctor/selectPlan.html'
			})
			.state('docfind.doctor-results', {
				url: "/doctor/results",
				templateUrl: 'app/docfind/partials/doctor/results.html'
			})
			.state('docfind.doctor-loading', {
				url: "/doctor/results/loading",
				templateUrl: 'app/docfind/partials/doctor/loading.html'
			})

			.state('docfind.dentist-login', {
				url: "/dentist/login",
				templateUrl: 'app/docfind/partials/dentist/login.html'
			})
			.state('docfind.dentist-zipCode', {
				url: "/dentist/zip",
				templateUrl: 'app/docfind/partials/dentist/dentistAndZip.html'
			})
			.state('docfind.dentist-planType', {
				url: "/dentist/select-plan",
				templateUrl: 'app/docfind/partials/dentist/selectPlan.html'
			})
			.state('docfind.dentist-results', {
				url: "/dentist/results",
				templateUrl: 'app/docfind/partials/dentist/results.html'
			})
			.state('docfind.dentist-loading', {
				url: "/dentist/results/loading",
				templateUrl: 'app/docfind/partials/dentist/loading.html'
			})

			.state('docfind.specialist-login', {
				url: "/specialist/login",
				templateUrl: 'app/docfind/partials/specialist/login.html'
			})
			.state('docfind.specialist-zipCode', {
				url: "/specialist/zip",
				templateUrl: 'app/docfind/partials/specialist/specialistAndZip.html'
			})
			.state('docfind.specialist-planType', {
				url: "/specialist/select-plan",
				templateUrl: 'app/docfind/partials/specialist/selectPlan.html'
			})
			.state('docfind.specialist-results', {
				url: "/specialist/results",
				templateUrl: 'app/docfind/partials/specialist/results.html'
			})
			.state('docfind.specialist-loading', {
				url: "/specialist/results/loading",
				templateUrl: 'app/docfind/partials/specialist/loading.html'
			});

});
