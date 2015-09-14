(function(){
	'use strict';

	angular.module('angularApp').service('reservationService',reservationService);

	reservationService.$inject = ['$q', '$http'];

	function reservationService($q, $http) {
		var self = this;
		
		

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

		self.makeReservation = function(newReservation) {
			var defer = $q.defer();
			$http({
				method: 'POST',
				url: '../api/reservations',
				data: newReservation
			})
			.success(function(data){
				
					defer.resolve(data);
				
			})
			.error(function(err){
				defer.reject(err);
			});
			return defer.promise;
		};
		
		self.getReservationByConfirmationCode = function(confCode){
			
			  var defer = $q.defer();
		      $http({
					method: 'GET',
					url: 'api/owners/reservations/'+ confCode
					
				})
				.success(function(data){
					if(data.status == 'success'){
						defer.resolve(data.payload);
					}
				})
				.error(function(err){
					data.reject(err);
				});
		      return defer.promise;
			
		}
		
	    self.deleteReservation = function (confCode) {
	    	 var defer = $q.defer();
	         $http({
	   			method: 'DELETE',
	   			url: '../api/reservations/'+confCode,
	   			data: confCode
	   		})
	   		.success(function(data){
	   				console.log("Delete")
	  				defer.resolve(data);
	  			
	  		})
	  		.error(function(err){
	  			data.reject(err);
	  		});
	        return defer.promise;
	      };
	    
	    self.deleteReservationByOwner = function (confCode) {
		    
		    	 var defer = $q.defer();
		         $http({
		   			method: 'DELETE',
		   			url: '../api/owners/reservations/'+confCode
		   			
		   		})
		   		.success(function(data){
		  			if(data.status == 'success'){
		  				defer.resolve(data);
		  			}
		  		})
		  		.error(function(err){
		  			data.reject(err);
		  		});
		        return defer.promise;
		      };
		
		self.makeReservationByOwner = function(newReservation) {
					var defer = $q.defer();
					$http({
						method: 'POST',
						url: 'api/owners/reservations',
						data: newReservation
					})
					.success(function(data){
						
							defer.resolve(data);
						
					})
					.error(function(err){
						data.reject(err);
					});
					return defer.promise;
				};
	}
})();
