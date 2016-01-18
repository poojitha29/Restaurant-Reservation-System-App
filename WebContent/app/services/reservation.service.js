(function(){
	'use strict';

	angular.module('angularApp').service('reservationService',reservationService);

	reservationService.$inject = ['$q', '$http'];

	function reservationService($q, $http) {
		var self = this;
		

		self.getReservations = function(){
			var defer = $q.defer();
			$http.get('api/owners/reservations')
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
				url: 'api/reservations/'+ confCode					
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

	}
})();
