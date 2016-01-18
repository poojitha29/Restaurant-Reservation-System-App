(function(){
	'use strict';

	angular.module('angularApp', ['ngRoute','ngMessages','ui.router',
	                              'ui.bootstrap',
	                              'ui.router.tabs','ngCookies'])
	.config(moduleConfig);

	moduleConfig.$inject = ['$stateProvider','$urlRouterProvider'];
	function moduleConfig($stateProvider,$urlRouterProvider) {

		$urlRouterProvider.otherwise("/");
		 
		$stateProvider
		.state('home',{
			url:'/',
			templateUrl: 'views/home.tmpl.html'
		})
		
		.state('reservation',{
			url: '/reservation',
			templateUrl: 'views/reservation.tmpl.html',
			controller: 'ReservationsController',
			controllerAs: 'reservationsVm'
		})
		.state('reservation.make',{
			url: '/reservation.make',
			templateUrl: 'views/make-reservation-customers.tmpl.html',
			controller: 'CreateReservationController',
			controllerAs: 'createReservationsVm'
			
		})
		.state('reservation.edit',{
			url: '/reservation.edit',
			templateUrl: 'views/show-reservations.tmpl.html',
			controller: 'ReservationsController',
			controllerAs: 'reservationsVm'
			
		})
		.state('contact',{
			url: '/contact',
			templateUrl: 'views/contact.tmpl.html',
			controller: 'CustomerQueryController',
			controllerAs: 'customerQueriesVm'
			
		})
		.state('owner',{
			url: '/owner',
			templateUrl: 'views/owner-login.tmpl.html',
			controller: 'OwnerLoginController',
			controllerAs: 'loginVm',
			hideMenus: true
			
		})
		.state('access',{
			url: '/access',
			templateUrl: 'views/owner-access-only.tmpl.html',
		
		})
		.state('access.all',{
			url: '/access.all',
			templateUrl:'views/reservations-grid.tmpl.html',
			controller: 'ReservationsController',
			controllerAs: 'reservationsVm'
		})
				
		.state('access.table',{
			url: '/access.table',
			templateUrl:'views/tables-grid.tmpl.html',
			controller: 'TablesController',
			controllerAs: 'tablesVm'
		})
		
		.state('access.make',{
			url: '/access.make',
			templateUrl:'views/make-reservation-owner.tmpl.html',
			controller: 'CustomerQueryController',
			controllerAs: 'customerQueriesVm'
		})
		
		.state('access.edit',{
			url: '/access.edit',
			templateUrl:'views/show-reservations.tmpl.html',
			controller: 'CustomerQueryController',
			controllerAs: 'customerQueriesVm'
		})
		
		.state('access.query',{
			url: '/access.query',
			templateUrl:'views/show-contact-queries.tmpl.html',
			controller: 'CustomerQueryController',
			controllerAs: 'customerQueriesVm'
		})
	}


})();

