
'use strict';

angular.module('applicationApp')
  .controller('MedicareCtrl', function ($scope, $http, $location, searchService, loginService, docfindService, $state, $timeout) {
 
   
  $scope.searchData = {};
    $scope.searchData.query = '';
    $scope.searchData.results = {};
    $scope.searchData.matches = [];
    $scope.commandStatus = 'idle';
    $scope.commandStatusNext = 'idle';
    $scope.workQueue = [];

    $scope.docFind = {};
    $scope.docFind.searchQuery = '';
    $scope.docFind.planQuery = '';
    $scope.docFind.searchRadius = 1;
    $scope.docFind.officeDetail = '';
    $scope.docFind.gender = '';
    $scope.docFind.group = '';
    $scope.docFind.language = '';
    $scope.docFind.doctorType = '';
    $scope.docFind.hospital = '';
    $scope.docFind.planInfo = '';
    $scope.docFind.usePlan = true;

    $scope.docFind.result = {};

    $scope.auth = loginService;


    $scope.auth.loginState = 'medicare.login';
    $scope.auth.logoutState = 'medicare.home';
 

    $scope.mapCenter = { latitude: 45, longitude: -73 };
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    $scope.markers = [];
    $scope.mapControl = {};
    $scope.viewMap = false;


    $scope.showPlanLinks = false;

    if($scope.auth.isLoggedIn){
        $scope.docFind.planQuery = 'NAPDS|National Advantage Program';
    }
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
    $scope.setState = function(state){ 

        $state.go(state);
        $scope.viewMap = false;

    };


    $scope.getResults = function(usePlan, state, wait_state){


        $scope.docFind.usePlan = usePlan;

        var query = getQuery();

        $state.go(wait_state);

        docfindService.search(query).then(function(data){
            $scope.docFind.result = data;
            $state.go(state);
            getMarkers();
            updateMapCenter();

            $scope.viewMap = true;
            
        });
    };

    $scope.$watch("viewMap", function(newvalue) {
        $timeout(function() {
            if($scope.mapControl.refresh){
                 var map = $scope.mapControl.refresh();
             }
        }, 0);
    });

    $scope.updateResults = function(){
        var query = getQuery();
        docfindService.search(query).then(function(data){
            $scope.docFind.result = data;
            getMarkers();
            updateMapCenter();
        });
    };


    $scope.showPlanOptions = function(){

      $scope.showPlanLinks = true;

    };
    $scope.hidePlanOptions = function(){

      $scope.showPlanLinks = false; 

    };
    function updateMapCenter(){

        // var bound = new google.maps.LatLngBounds();

        // for (i = 0; i < $scope.markers.length; i++) {
        //   bound.extend( new google.maps.LatLng($scope.markers[i].location) );
        // }
 
        // $scope.mapCenter = bound.getCenter();

    }
    function getMarkers(){

        while($scope.markers.length > 0){

            $scope.markers.pop();

        }

        for (var i = 0; i < $scope.docFind.result.results.length; i++) {
            var id = $scope.docFind.result.results[i].id;
            var marker = {
                location: { latitude: $scope.docFind.result.results[i].latitude,
                    longitude: $scope.docFind.result.results[i].longitude },
                item: $scope.docFind.result.results[i],
                id: id,
                icon: '/assets/images/marker-' + (id + 1) + '.png'
            }; 

            $scope.markers.push(marker);
        }
        
    }
    function getQuery(){

        var filters = [];
        var query = '?searchQuery=' + $scope.docFind.searchQuery;
        query += '&site_id=medicare';
        query += '&geoSearch=' + $scope.auth.zipCode;
        query += '&zip=' + $scope.auth.zipCode;
        query += '&QuickZipcode=' + $scope.auth.zipCode;
        query += '&distance=' + $scope.docFind.searchRadius;
        query += '&radius=' + $scope.docFind.searchRadius;
        query += '&QuickCoordinates=' + $scope.docFind.result.quickCoordinates;

        if($scope.docFind.usePlan && $scope.docFind.planQuery){ 
            var planData = $scope.docFind.planQuery.split('|');
            query += '&modalSelectedPlan=' + planData[0].trim();
            query += '&productPlanName=' + planData[1].trim();
        }

        /* &filterValues= */
        //Group:groupnavigator:9731724
        //OfficeDetail:flagnavigator:ERX
        //Languages:languagenavigator:French
        //Gender:gendernavigator:Female
        //HospitalAffiliations:hospitalnavigator:6140395
        //PrimaryCare:rollupnavigator:10201
        //Specialists


         


        if($scope.docFind.planInfo == 'AEX'){
            filters.push('PlanInformation%3Acategorynavigator%3AAEX|PlanInformation%3Acategorytierlimit%3AAEXxxx1') 
        }
        if($scope.docFind.gender){
            filters.push('Gender%3Agendernavigator%3A' + $scope.docFind.gender);
        }
        if($scope.docFind.language){
            filters.push('Languages%3Alanguagenavigator%3A' + $scope.docFind.language);
        }
        if($scope.docFind.officeDetail){
            filters.push('OfficeDetail%3Aflagnavigator%3A' + $scope.docFind.officeDetail);
        }
        if($scope.docFind.group){
            filters.push('Group%3Agroupnavigator%3A' + $scope.docFind.group);
        }
        if($scope.docFind.hospital){
            filters.push('HospitalAffiliations%3Ahospitalnavigator%3A' + $scope.docFind.hospital);
        }
        if($scope.docFind.doctorType){
            filters.push('PrimaryCare%3Arollupnavigator%3A' + $scope.docFind.doctorType);
        }
        if(filters.length)
        {
            query += '&filterValues=' + filters.join('|');
        }

        return query;
    }

    $state.go('medicare.home');

});
