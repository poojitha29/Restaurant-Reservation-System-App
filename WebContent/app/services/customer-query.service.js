(function(){
	'use strict';

	angular.module('angularApp').service('customerQueryService',customerQueryService);

	customerQueryService.$inject = ['$q', '$http'];

	function customerQueryService($q, $http) {
		var self = this;
		


		self.addCustomerQueries = function(query) {
			var defer = $q.defer();
			$http({
				method: 'POST',
				url: 'api/customers/queries',
				data: query	              
			}).success(function(data){
				console.log("Add customer queries service");
				defer.resolve(data.payload);
			}).error(function(err){	             
				defer.reject(err.status);
			});
			return defer.promise;
		};
		
		
		
		self.getCustomerQueries = function(){
			var defer = $q.defer();
			$http.get('api/customers/queries')
			.then(function(response){
				defer.resolve(response.data);
			}, function(error){
				defer.reject(error.status);
			});
			return defer.promise;
		};
			

		

	}
})();
