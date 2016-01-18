(function(){
	'use strict';

	angular.module('angularApp').service('deleteReservationService',deleteReservationService);

	deleteReservationService.$inject = ['$q', '$http'];

	function deleteReservationService($q, $http) {
		var self = this;
		

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

	
	}
})();
