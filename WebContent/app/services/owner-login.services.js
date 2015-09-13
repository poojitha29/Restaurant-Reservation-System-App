(function() {
  'use strict';

  app.service('loginService', loginServiceFn);

  loginServiceFn.$inject = ['$q', '$http','$window'];
  function loginServiceFn($q, $http, $window) {
    var self = this;
    
    self.getCredentials = function(login) {
      var defer = $q.defer();
      $http({
			method: 'GET',
			url: 'api/owners/login'
		})
		.success(function(data){

				if(login.username==data.payload.username && login.password==data.payload.password){
					console.log("success");
					$window.location.href = '../views/owner-access-only.html';
				}
				else{
					data.payload.message="Your username or password is wrong";
				}
				defer.resolve(data.payload);
			
		})
		.error(function(err){
			data.reject(err);
		});
      return defer.promise;
    };
    
  }
  
})();