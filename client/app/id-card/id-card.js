'use strict';

angular.module('applicationApp')
  .config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('id-card', {
			url: "/id-card",
			templateUrl: 'app/id-card/id-card.html',
			controller: 'IdCardCtrl',
			data:{}
		})
		.state('id-card.home', {
			url: "/home",
			templateUrl: 'app/id-card/partials/main.html'
		})
		.state('id-card.order', {
			url: "/order",
			templateUrl: 'app/id-card/partials/order-select.html'
		})
		.state('id-card.print', {
			url: "/print",
			templateUrl: 'app/id-card/partials/print-select.html'
		})
		.state('id-card.order-login', {
			url: "/order/login",
			templateUrl: 'app/id-card/partials/order-login.html'
		})
		.state('id-card.print-login', {
			url: "/print/login",
			templateUrl: 'app/id-card/partials/print-login.html'
		})
		.state('id-card.order-confirm', {
			url: "/order/confirm",
			templateUrl: 'app/id-card/partials/order-confirm.html'
		}); 
  });
