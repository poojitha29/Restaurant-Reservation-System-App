(function(){
	'use strict';

	angular.module('angularApp').controller('TablesController', TablesControllerFn);

	TablesControllerFn.$inject = ['tableService'];
	function TablesControllerFn(tableService) {
		var tablesVm = this;
		
		tableService.getTables()
		.then(function(result){
			console.log(result);
			tablesVm.tables = result;
		},function(error){
			console.log("error");
		});

	
	}
})();

