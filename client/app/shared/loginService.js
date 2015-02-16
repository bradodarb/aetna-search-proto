'use strict';

angular.module('applicationApp').service('loginService',

	function ($http, $location, localStorageService, $state){

		var loginKey = 'user';
		var zipCodeKey = 'zipCode';
		var _self = this;

		this.loginState = '';
		this.logoutState = '';

		this.__defineGetter__('login', function(){

			if(localStorageService.isSupported){

				return localStorageService.get(loginKey);

			}else{

				return localStorageService.cookie.get(loginKey);

			}

		});

		this.__defineSetter__('login', function(login){

			if(localStorageService.isSupported){

				localStorageService.set(loginKey,login);

			}else{

				localStorageService.cookie.set(loginKey,login);

			}

		});

		this.__defineGetter__('zipCode', function(){

			if(localStorageService.isSupported){

				return localStorageService.get(zipCodeKey);

			}else{

				return localStorageService.cookie.get(zipCodeKey);

			}

		});

		this.__defineSetter__('zipCode', function(zipCode){

			if(localStorageService.isSupported){

				localStorageService.set(zipCodeKey,zipCode);

			}else{

				localStorageService.cookie.set(zipCodeKey,zipCode);

			}

		});

		this.__defineGetter__('isLoggedIn', function(){

			return !!_self.login;

		});

		this.clearLogin = function(){


			if(localStorageService.isSupported){

				localStorageService.clearAll();

			}else{

				localStorageService.cookie.clearAll();
				
			}
		};


	    this.requestLogin = function(){
	    	if(!!_self.loginState){

	    		$state.go(_self.loginState);
	    	}
	    };

	    this.trylogin = function(state){ 
	    	if(!!_self.login){

	    		$state.go(state);
	    	}
	    };

	    this.logout = function(){

			_self.clearLogin();

			if(!!_self.logoutState){
				
	    		$state.go(_self.logoutState);
	    	}

	    };

	});