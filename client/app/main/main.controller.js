'use strict';

angular.module('applicationApp')
  .controller('MainCtrl', function ($scope, $http, $location, $stateParams, searchService) {

   $scope.searchData = {};
    $scope.searchData.query = '';
    $scope.searchData.results = {};
    $scope.searchData.matches = [];

    $scope.getMatches = function(match){

        return searchService.getMatches(match);
    };

    $scope.performSearch = function(){ 


      if($scope.searchData.query ==='<em style="pointer-events:none;">other popular searches...</em>'){
      $scope.searchData.query = '';
        return;
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

  });
