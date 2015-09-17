(function(){

	'use strict';

	angular.module('BasicHttpAuthExample')

	.controller('LoginController',    ['$scope', '$rootScope', '$location', 'authenticationService',
	                                   function ($scope, $rootScope, $location, authenticationService) {
		// reset login status
		AuthenticationService.ClearCredentials();

		$scope.login = function () {
			$scope.dataLoading = true;

			authenticationService.Login($scope.username, $scope.password, function(response) {

				if(response.success) {

					authenticationService.SetCredentials($scope.username, $scope.password);

					$location.path('/');


				} else {

					$scope.error = response.message;

					$scope.dataLoading = false;
				}
			});
		};
	}]);


})();


