'use strict';

angular.module('applicationApp')
  .controller('SearchCtrl', function ($scope, $http, $location, $stateParams, searchService) {

	var _queryResult = '';
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
          $location.path('/search/Insurance'); 
        }
		if(!$scope.searchData.query){
	    		return;
    	}
    	_queryResult = $scope.searchData.query;
    	var customPage = searchService.customPageRequest($scope.searchData.query);
        if(customPage){
            if(customPage.indexOf('http') === 0){
                window.location.href = customPage;
            }else{
                $location.path(customPage).replace();
            }
        }else{
            var query = String($scope.searchData.query).replace(/<[^>]+>/gm, '');
            searchService.search(query).then(function(results){
                $scope.searchData.results = results;
            });
        } 
		$scope.searchData.query = '';
    };
 
    $scope.displayQuery = function(){
    	if(!_queryResult){
    		return '';
    	}
    	return String(_queryResult).replace(/<[^>]+>/gm, '');
    };
    
    $scope.init = function(){
    	if($location.$$search && $location.$$search.query){
    		$scope.searchData.query = $location.$$search.query;
    		$scope.performSearch();
    	}else{
    		if($stateParams && $stateParams.query){
				$scope.searchData.query = $stateParams.query;
	    		$scope.performSearch();
    		}
    	}

    };
    $scope.init();
  });
