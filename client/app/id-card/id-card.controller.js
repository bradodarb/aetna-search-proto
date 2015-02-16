'use strict';

var app = angular.module('applicationApp');

app.controller('IdCardCtrl', function ($scope, $http, $location, searchService, loginService, $state) {
 
   
    $scope.searchData = {};
  	$scope.searchData.query = '';
    $scope.searchData.results = {};
    $scope.searchData.matches = [];
    $scope.commandStatus = 'idle';
    $scope.commandStatusNext = 'idle';

    $scope.auth = loginService; 


    $scope.auth.loginState = 'id-card.print-login';
    $scope.auth.logoutState = 'id-card.home';

    $scope.getMatches = function(match){

		  return searchService.getMatches(match);

    };
    
    $scope.performSearch = function(){ 

       if($scope.searchData.query === '<em style="pointer-events:none;">other popular searches...</em>'){
        $scope.searchData.query = '';
          $location.path('/search/Insurance'); 
        }
        var customPage = searchService.customPageRequest($scope.searchData.query);
        if(customPage){
         if(customPage.indexOf('http') === 0){
                window.location.href = customPage;
            }else{
                $location.path(customPage).replace();
            }
        }else{
          var query = String($scope.searchData.query).replace(/<[^>]+>/gm, '');
          $location.path('/search/' + query); 
        }
        $scope.searchData.query = '';
      };

    $state.go('id-card.home');
  });
