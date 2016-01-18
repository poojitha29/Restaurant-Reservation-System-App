(function(){
	'use strict';

	angular.module('angularApp').controller('CreateReservationController', CreateReservationControllerFn);

	CreateReservationControllerFn.$inject = ['$rootScope','createReservationService'];
	function CreateReservationControllerFn($rootScope,createReservationService) {
		var createReservationsVm = this;
		$rootScope.showReservation = false;
		$rootScope.deleteMessage = false;  
		$rootScope.confirmation = false;
		$rootScope.editRow=false;
		$rootScope.makeReservation=true;
		$rootScope.reservationsGrid = true;


		createReservationsVm.addReservationByOwner = function(){
			console.log("Add reservation function");
			console.log(createReservationsVm.reservations.reservation); 
			createReservationService.addReservationByOwner(createReservationsVm.reservations.reservation).then(function(data) {
				createReservationsVm.newConfcode = data.confirmationcode;
				$rootScope.confirmation = true;
				$rootScope.makeReservation = false;	
				createReservationsVm.reservations.reservation = null;

			}, function(err) {
				console.log(err);
			});	
		}
		
		createReservationsVm.makeAnotherReservation= function(){
			$rootScope.makeReservation=true;
			$rootScope.confirmation = false;
		}
		
		createReservationsVm.addReservationByCustomers = function(){
			alert("Confirm");
			console.log("Add reservation function");
			console.log(createReservationsVm.reservations.reservation); 
			createReservationService.addReservationByCustomers(createReservationsVm.reservations.reservation).then(function(data) {
				createReservationsVm.newConfcode = data.confirmationcode;
				$rootScope.confirmation = true;
				$rootScope.makeReservation = false;
				createReservationsVm.reservations.reservation = null;
			}, function(err) {
				console.log(err);
			});
		}   
	}


})();

