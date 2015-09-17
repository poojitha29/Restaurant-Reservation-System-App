(function(){
	'use strict';

	angular.module('angularApp').service('tableService',tableService);

	tableService.$inject = ['$q', '$http'];

	function tableService($q, $http) {
		var self = this;
		

		self.getTables = function(){
			var defer = $q.defer();
			$http.get('api/tables')
			.then(function(response){
				console.log(response);
				defer.resolve(response.data);
			}, function(error){
				defer.reject(error.status);
			});
			return defer.promise;
		};
			

	}
})();
