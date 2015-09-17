(function(){
	'use strict';

	angular.module('angularApp').controller('OwnerLoginController', OwnerLoginControllerFn);

	OwnerLoginControllerFn.$inject = ['$location','$rootScope','ownerLoginService','$state', '$scope'];
	
	
	function OwnerLoginControllerFn($location,$rootScope,ownerLoginService,$state,$scope) {
		var loginVm = this;

		ownerLoginService.ClearCredentials();
		
		
		loginVm.getLoginCredentials= function(){
			ownerLoginService.getLoginCredentials()
			.then(function(result){
				var  username = loginVm.credentials.username;
				var  password = loginVm.credentials.password;
				
				if(username===result.username && password === result.password){
					console.log("Successful");
					ownerLoginService.SetCredentials(username, password);
					$location.path('access');

				}
				else{
					$scope.error = response.message;
				}

			},function(error){
				console.log(error);				
			});

		}
		$rootScope.logout= function(){
			$location.path('owner');
		}
	}


})();

