(function(){
	
	'use strict';
	
	app.controller('OwnerLoginCtrl',OwnerLoginCtrlFn);
	
	OwnerLoginCtrlFn.$inject = ['loginService'];
	
	function LoginController(loginService){
		
		var loginVm = this;
		loginVm.authenticate = function (isFormValid){
			
			if(isFormValid){
				loginService.getCredentials(loginVm.login).then(function(data){
					loginVm.message = data.message;
				},function(err){
				console.log(err);	
				
				})
			}
		}
	}
	
})();