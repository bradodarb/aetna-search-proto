'use strict';

angular.module('applicationApp').service('docfindService',
	function ($http, $location, customPageService){

		this.search = function(query){ 
				if(!query){
		    		return;
		    	}
		    	query = String(query).replace(/<[^>]+>/gm, '');
				var result = {};
				var promise = $http.get('/api/docfind/' + query).success(function(results) {
 
		 			result = results;
 

			    }).then(function(){
			      return result;
			    });

			    return promise;
    	};

});