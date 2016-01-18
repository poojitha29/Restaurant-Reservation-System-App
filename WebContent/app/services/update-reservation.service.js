(function(){
	'use strict';

	angular.module('angularApp').service('updateReservationService',updateReservationService);

	updateReservationService.$inject = ['$q', '$http'];

	function updateReservationService($q, $http) {
		var self = this;
		

		self.updateReservationByCustomer = function(confCode,obj){
			var defer = $q.defer();
			$http({
				method: 'PUT',
				url: 'api/reservations/'+ confCode,
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

		
		self.updateRegStatusOwner = function(confCode, obj){
			var defer = $q.defer();
			$http({
				method: 'PUT',
				url: 'api/owners/reservations/'+ confCode,
				data: obj
			})
			.success(function(data){
				console.log("Inside OWner updateReservation",data);
				defer.resolve(data);
			})
			.error(function(err){
				console.log("OWNER UPDATE ERROR");
				defer.reject(err);
			});
			return defer.promise;		    	
		}




	}
})();
