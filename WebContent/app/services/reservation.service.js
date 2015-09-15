(function(){
	'use strict';

	angular.module('angularApp').service('reservationService',reservationService);

	reservationService.$inject = ['$q', '$http'];

	function reservationService($q, $http) {
		var self = this;
		
		
		self.updateReservationByCustomer = function(confCode,obj){
			var defer = $q.defer();
		      $http({
					method: 'PUT',
					url: '../api/reservations/'+ confCode,
					data: obj
				})
				.success(function(data){
					console.log("Inside updateReservation",data);
					defer.resolve(data);
				})
				.error(function(err){
					console.log("UPDATE ERROR");
					defer.reject(err.status);
				});
		      return defer.promise;	
		}
		
		self.getReservations = function(){
			var defer = $q.defer();
			$http.get('../api/owners/reservations')
			.then(function(response){
				defer.resolve(response.data);
			}, function(error){
				defer.reject(error.status);
			});
			return defer.promise;
		};
		
		
		self.getReservationByConfirmationCode = function(confCode){
			var defer = $q.defer();
		      $http({
					method: 'GET',
					url: '../api/reservations/'+ confCode					
				})
				.success(function(response){
					console.log("GET RESERVATION BY CONFCODE");
					//console.log(response);
					defer.resolve(response);
				})
				.error(function(err){
					defer.reject(err.status);
				});
		      return defer.promise;			
		};
		
		self.deleteReservation = function(confCode){
			var defer = $q.defer();
		      $http({
					method: 'DELETE',
					url: '../api/reservations/'+ confCode					
				})
				.success(function(response){
					console.log("DELETE REERVATION BY CONFCODE");
					console.log(response);
					defer.resolve(response.data);
				})
				.error(function(err){
					defer.reject(err.status);
				});
		      return defer.promise;			
		};
		

		self.getCustomers = function(){
			var defer = $q.defer();
			$http.get('../api/customers')
			.then(function(response){
				defer.resolve(response.data);
			}, function(error){
				defer.reject(error.status);
			});
			return defer.promise;
		};
		
		
		 self.addReservationByOwner = function(obj) {
	            var newPromise = $q.defer();
	            $http({
	                method: 'POST',
	                url: '../api/owners/reservations/new',
	                data: obj	              
	            }).success(function(data){
	                console.log(data);
	                newPromise.resolve(data);
	            }).error(function(err){	             
	                newPromise.reject(err.status);
	            });
	            return newPromise.promise;
	        };
	        
	        self.addReservationByCustomers = function(obj) {
	            var newPromise = $q.defer();
	            $http({
	                method: 'POST',
	                url: '../api/reservations/new',
	                data: obj,	              
	            }).success(function(data){
	                console.log(data);
	                newPromise.resolve(data);
	            }).error(function(err){	             
	                newPromise.reject(err.status);
	            });
	            return newPromise.promise;
	        };
	}
})();
