'use strict';

angular.module('applicationApp')
  .controller('DocFindCtrl', function ($scope, $http, $location, searchService) {
 
   
	$scope.searchData = {};
  	$scope.searchData.query = '';
    $scope.searchData.results = {};
    $scope.searchData.matches = [];
    $scope.commandStatus = 'idle';

    $scope.getMatches = function(match){

		  return searchService.getMatches(match);
    };

    $scope.performSearch = function(){ 

        if($scope.searchData.query === '<em style="pointer-events:none;">other popular searches...</em>'){
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

    $scope.setIdle = function(){
    $scope.commandStatus = 'idle';
        console.log($scope.commandStatus );
    };
    $scope.setMedical = function(){
    $scope.commandStatus = 'medical';
        console.log($scope.commandStatus );
    };
    $scope.setDental = function(){
    $scope.commandStatus = 'dental';
        console.log($scope.commandStatus );
    };
    $scope.setVision = function(){
    $scope.commandStatus = 'vision';
        console.log($scope.commandStatus );
    };
 console.log($scope.commandStatus );
    // var search.gem = function(data){

    //   console.log(data);

    //   for( prop in data){

    //     if(data.length){

    //       data.id = prop;
          
    //     }
    //   }
    // }
  });
