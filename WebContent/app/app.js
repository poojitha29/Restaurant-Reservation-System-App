(function(){
	'use strict';
	
	var app = angular.module("angualarApp",['ngMessages','ngRoute']);
	app.config(moduleConfig);
	
	moduleConfig.$inject = ['$routeProvider'];
	
	function moduleConfig($routeProvider){
		
	}
	
})();