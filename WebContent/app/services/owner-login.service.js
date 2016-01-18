(function(){
	'use strict';

	angular.module('angularApp').service('ownerLoginService',ownerLoginServiceFn);

	ownerLoginServiceFn.$inject = ['$q', '$http', '$cookieStore', '$rootScope', '$timeout'];

	function ownerLoginServiceFn($q, $http,$cookieStore,$rootScope,$timeout) {
		var self = this;
		
		self.getLoginCredentials = function(){
			var defer = $q.defer();
			$http.get('api/owners/login')
			.then(function(response){
		
				defer.resolve(response.data);
			}, function(error){
				defer.reject(error.status);
			});
			return defer.promise;
		};
		
		
		self.SetCredentials = function (username, password) {
            var authdata = username + ':' + password;

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };
 
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; 
            $cookieStore.put('globals', $rootScope.globals);
        };
		
        self.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

		
	}
})();
