'use strict';

angular.module('applicationApp').service('searchService',
	function ($http, $location, customPageService){

		this.search = function(query){ 
				if(!query){
		    		return;
		    	}
		    	query = String(query).replace(/<[^>]+>/gm, '');
				var result = [];
				var promise = $http.get('/api/search/' + query).success(function(results) {
 
					var doc = $.parseXML(results);
					$(doc).find('Results').find('Result').each(function(idx, val) {
					        var listingTitle = $(val).find('ResultField[Name="title"]').find('Value').text().trim();
					        var listingDesc = $(val).find('ResultField[Name="teaser"]').find('Value').text().trim();
					        var actualUrl = $(val).find('ResultField[Name="url"]').find('Value').text().trim();
					        var item = {

					        	title: listingTitle,
					        	desc: listingDesc,
					        	url: actualUrl
					        };
					        result.push(item);
					    });

			    }).then(function(){
			      return result;
			    });

			    return promise;
    	};
    	this.customPageRequest = function(query){
    		var result = '';
    		if(query.indexOf('<figure') === 0){
		    		$(query).children().map(function(){
		    			var href = $(this).attr('data-href');
		    			if(href){ 
		    				result = href;
		    			}
		    		});
		    	}
	    	return result;
    	};
    	this.getMatches = function(match){

		var list = [];
		//inject custom pages here-
		var suggestions = customPageService.getCustomPages(match);
		if(suggestions && suggestions.length){
			
			while(suggestions.length){  
			    var item = suggestions.pop();  
			    if(item){
			    	list.push(item);
			    }
			}
			list.push('<em style="pointer-events:none;">other popular searches...</em>');
		}
    	var promise = $http.get('/api/search/' + match).success(function(results) {
 
			var doc = $.parseXML(results);
			$(doc).find('Results').find('Result').each(function(idx, val) {
			        var listingTitle = $(val).find('ResultField[Name="title"]').find('Value').text().trim();
			        var actualUrl = $(val).find('ResultField[Name="url"]').find('Value').text().trim();

			        list.push('<figure><span data-href="' + actualUrl + '">' + listingTitle + '</span></figure>');
			    });
	    }).then(function(){
	    	return list;
	    });

	    return promise;
    };

});