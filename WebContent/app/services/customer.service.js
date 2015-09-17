(function(){
	'use strict';

	angular.module('angularApp').service('customerService',customerService);

	customerService.$inject = ['$q', '$http'];

	function customerService($q, $http) {
		var self = this;
		


		self.getCustomers = function(){
			var defer = $q.defer();
			$http.get('api/customers')
			.then(function(response){
				console.log(response);
				defer.resolve(response.data);
			}, function(error){
				defer.reject(error.status);
			});
			return defer.promise;
		};
		
		self.getCustomerQueries = function(){
			var defer = $q.defer();
			$http.get('api/customers/queries')
			.then(function(response){
				console.log(response);
				defer.resolve(response.data);
			}, function(error){
				defer.reject(error.status);
			});
			return defer.promise;
		};
		
		
		self.addCustomerQuery = function(obj) {
			var newPromise = $q.defer();
			$http({
				method: 'POST',
				url: 'api/customers/queries',
				data: obj	              
			}).success(function(data){
				//console.log(data);
				console.log(data);
				newPromise.resolve(data);
			}).error(function(err){	             
				newPromise.reject(err.status);
			});
			return newPromise.promise;
		};
		
	}
})();
