'use strict';

angular.module('applicationApp').service('customPageService',
	function (){

		this.getCustomPages = function(query){

			var target = query.toLowerCase();
			var result = [];
			var title = '';
			var copy = '';
			var image = '';

			if(contains(target, _idCardMap)){
				title = 'Aetna ID Card Information';
				copy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus quis odio vel volutpat.';
				image = 'img-a';

				result.push('<figure class="custom-page-link"><i class="' + image + '"></i><h4 data-href="/id-card">' + title + '</h4><p>' + copy + '</p></figure>');
			}
			if(contains(target, _medicareMap)){
				title = 'Medicare Aquisitions';
				copy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus quis odio vel volutpat.';
				image = 'img-b';

				result.push('<figure class="custom-page-link"><i class="' + image + '"></i><h4 data-href="/medicare">' + title + '</h4><p>' + copy + '</p></figure>');
			}
			if(contains(target, _docFindMap)){
				title = 'DocFind';
				copy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus quis odio vel volutpat.';
				image = 'img-c';

				result.push('<figure class="custom-page-link"><i class="' + image + '"></i><h4 data-href="/docfind">' + title + '</h4><p>' + copy + '</p></figure>');
			}

			return result;
		};

		function contains(query, map){
			if(!query || query.length < 2){
				return;
			}
			var len = map.length;
			for (var i = 0; i < len; i++) {
				if(query.indexOf(map[i]) > -1 || map[i].indexOf(query) > -1){
					return true;
				}
			}
		}

		var _idCardMap = ['id ', 'card', 'id-', 'idcard', 'hsa'];
		var _medicareMap = ['medi', 'acq', 'care'];
		var _docFindMap = ['doc','doctor', 'dr ', 'dr.', 'find', 'list', 'netw'];

});
