(function(){
	'use strict';

	angular.module('angularApp').controller('CustomerQueryController', CustomerQueryControllerFn);

	CustomerQueryControllerFn.$inject = ['$rootScope','customerQueryService'];
	function CustomerQueryControllerFn($rootScope,customerQueryService) {
		var customerQueriesVm = this;

	
		customerQueriesVm.addCustomerQuery = function(){

			
	
			customerQueryService.addCustomerQueries(customerQueriesVm.queries.query).then(function(data) {
				customerQueriesVm.queries.query = null;
				console.log(data);
			}, function(err) {
				console.log(err);
			});	
		}	
		
		
	}
})();

