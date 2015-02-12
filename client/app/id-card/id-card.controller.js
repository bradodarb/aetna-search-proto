'use strict';

angular.module('applicationApp')
  .controller('IdCardCtrl', function ($scope, $http, $location, searchService, loginService) {
 
   
	$scope.searchData = {};
  	$scope.searchData.query = '';
    $scope.searchData.results = {};
    $scope.searchData.matches = [];
    $scope.commandStatus = 'idle';
    $scope.commandStatusNext = 'idle';

    $scope.login = {};
    $scope.login.userName = loginService.getLogin(); 
 
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


      $scope.seeOtherResults = function(){

        $location.path('/search/id card'); 
      };
      $scope.setIdle = function(){
        $scope.commandStatus = 'idle';
      };

      $scope.setLogin = function(){
        $scope.commandStatus = 'login';
      };

      $scope.setPrint = function(){
        checkLogin('print');
      };

      $scope.setReplace = function(){
        checkLogin('replace');
      };
      $scope.setRequested = function(){
        checkLogin('requested');
      };



      $scope.login.isLoggedIn = function(){
        return loginService.isLoggedIn();
      };

      $scope.login.setLogin = function(){
        $scope.commandStatus = 'login';
      };
      $scope.login.trylogin = function(){
        if(!!$scope.login.userName){
          loginService.setLogin($scope.login.userName);
          if(!!$scope.commandStatusNext){
            $scope.commandStatus = $scope.commandStatusNext;
          }else{
            $scope.commandStatus = 'idle';
          }
        }
      };
      $scope.login.logout = function(){

        loginService.clearLogin();
        $scope.login.userName = '';

      };

      function checkLogin(status){

        if(loginService.isLoggedIn()){
          $scope.commandStatus = status;
        }else{
          $scope.commandStatusNext = status;
          $scope.setLogin();
        }
      }
  });
