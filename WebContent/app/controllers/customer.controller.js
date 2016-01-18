(function(){
	'use strict';

	angular.module('angularApp').controller('CustomerController', CustomerControllerFn);

	CustomerControllerFn.$inject = ['customerService','customerQueryService'];
	function CustomerControllerFn(customerService,customerQueryService) {
		var customersVm = this;

		customerService.getCustomers()
		.then(function(result){
			customersVm.customers = result;
		},function(error){
			console.log("error");
		});
		
		customerQueryService.getCustomerQueries()
		.then(function(result){
			console.log(result);
			customersVm.queries = result;
		},function(error){
			console.log("error");
		}); 
/*
	
		customersVm.addCustomerQuery = function(){
			console.log("Add reservation function");
			console.log(customersVm.queries.query); 
			customerService.addCustomerQuery(customersVm.queries.query).then(function(data) {
				console.log(data);
				customersVm.queries.query = null;
			}, function(err) {
				console.log(err);
			});	
		}
	*/
		
	}
	
	
})();

