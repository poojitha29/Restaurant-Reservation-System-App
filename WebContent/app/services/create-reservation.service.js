(function(){
	'use strict';

	angular.module('angularApp').service('createReservationService',createReservationService);

	createReservationService.$inject = ['$q', '$http'];

	function createReservationService($q, $http) {
		var self = this;

		self.addReservationByOwner = function(obj) {
			var newPromise = $q.defer();
			$http({
				method: 'POST',
				url: 'api/owners/reservations/new',
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
				url: 'api/reservations/new',
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
