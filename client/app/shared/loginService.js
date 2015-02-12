'use strict';

angular.module('applicationApp').service('loginService',

	function ($http, $location, localStorageService){

		var loginKey = 'user';
		var zipCodeKey = 'zipCode';
		var _self = this;
		this.getLogin = function(){

			if(localStorageService.isSupported){

				return localStorageService.get(loginKey);

			}else{

				return localStorageService.cookie.get(loginKey);

			}

		};

		this.getZipCode = function(){

			if(localStorageService.isSupported){

				return localStorageService.get(zipCodeKey);

			}else{

				return localStorageService.cookie.get(zipCodeKey);

			}

		};



		this.setLogin = function(login){

			if(localStorageService.isSupported){

				return localStorageService.set(loginKey,login);

			}else{

				return localStorageService.cookie.set(loginKey,login);

			}

		};

		this.setZipCode = function(zipCode){

			if(localStorageService.isSupported){

				return localStorageService.set(zipCodeKey, zipCode);

			}else{

				return localStorageService.cookie.set(zipCodeKey,zipCode);

			}

		};


		this.isLoggedIn = function(){

			return !!_self.getLogin();
		};

		this.clearLogin = function(){


			if(localStorageService.isSupported){

				localStorageService.clearAll();

			}else{

				localStorageService.cookie.clearAll();
				
			}
		};


	});