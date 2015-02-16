'use strict';

var app = angular.module('applicationApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'uiGmapgoogle-maps',
  'LocalStorageModule'
]);
  app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
  });

  app.run(function($rootScope,  $state, loginService){
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){

      switch(toState.name){

        case 'id-card.print':
          if(!loginService.isLoggedIn){
            event.preventDefault();
            $state.go('id-card.print-login');
          }
        break;
        case 'id-card.order':
          if(!loginService.isLoggedIn){
            event.preventDefault();
            $state.go('id-card.order-login');
          }
        break;

        default:
        break;
      }

    });
});


 