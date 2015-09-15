(function(){
	'use strict';

	angular.module('angularApp').controller('ReservationsController', ReservationsControllerFn);

	ReservationsControllerFn.$inject = ['$rootScope','reservationService'];
	function ReservationsControllerFn($rootScope,reservationService) {
		var reservationsVm = this;
		$rootScope.showReservation = false;
		$rootScope.deleteMessage = false;  
		$rootScope.confirmation = false;
		$rootScope.editRow=false;
		$rootScope.makeReservation=true;
		$rootScope.reservationsGrid = true;

		reservationService.getReservations()
		.then(function(result){
			reservationsVm.reservations = result;
		},function(error){
			console.log("error");
		});
		reservationService.getCustomers()
		.then(function(result){
			reservationsVm.customers = result;
		},function(error){
			console.log("error");
		});
		var confCodeUpdateOwner = null;
		reservationsVm.editResvnRow=function(confCode){
			confCodeUpdateOwner = confCode;
			console.log(confCode);
			$rootScope.editRow = true;
			$rootScope.reservationsGrid = false;
		}
		
		reservationsVm.clear = function(){
			reservationsVm.reservations.reservation = null;
		}

		
		reservationsVm.getLoginCredentials= function(){
			
			reservationService.getLoginCredentials()
			.then(function(result){
				console.log(result);
				reservationsVm.credentials = result;
			},function(error){
				console.log("error");
			});

		
		}
		
		reservationsVm.updateResvnStatus= function(){
			//console.log("updateRegStatus");
			
			console.log("Update registration owner"+confCodeUpdateOwner);
			console.log("Update Data");
			console.log(reservationsVm.reservations.reservation);
			reservationService.updateRegStatusOwner(confCodeUpdateOwner, reservationsVm.reservations.reservation)
			.then(function(data) {
				console.log(data);
				reservationsVm.reservation = data;
				$rootScope.editRow=false;
				$rootScope.reservationsGrid = true;
			}, function(err) {
				console.log(err);
			});
			
		}

		reservationsVm.showReservationByConfCode = function(){
			console.log("SHOW"+reservationsVm.reservations.confirmationcode);
			reservationService.getReservationByConfirmationCode(reservationsVm.reservations.confirmationcode).then(function(data) {
				reservationsVm.reservation = data;
				$rootScope.showReservation = true;
				$rootScope.modifyReservation = false;
				$rootScope.deleteMessage = false;
				$rootScope.editConfirm = false;
				reservationsVm.reservations.confirmationcode = null;
			}, function(err) {
				console.log(err);
			});
		}

		reservationsVm.modifyReservationByConfCode = function(){
			console.log("modify"+reservationsVm.reservations.confirmationcode);
			reservationService.getReservationByConfirmationCode(reservationsVm.reservations.confirmationcode).then(function(data) {
				reservationsVm.reservation = data;
				$rootScope.showReservation = false;
				$rootScope.modifyReservation = true;
				$rootScope.deleteMessage = false;
				$rootScope.editConfirm = false;
			}, function(err) {
				console.log(err);
			});
		};

		reservationsVm.updateReservationByCustomers = function(){
			console.log("Update reservation confirmation code");
			console.log(reservationsVm.reservation.confirmationcode);
			console.log("Update reservation function DATA");
			console.log(reservationsVm.reservations.reservation);
			var confCode= reservationsVm.reservation.confirmationcode; 
			reservationService.updateReservationByCustomer(confCode,reservationsVm.reservations.reservation)
			.then(function(data) {
				console.log("UPDATE CONTROLLER Reservation");
				console.log(data);
				reservationsVm.updatedReservation = data;
				reservationsVm.reservations.reservation=null;
				reservationsVm.reservations.confirmationcode = null;
				$rootScope.showReservation = false;
				$rootScope.modifyReservation = false;
				$rootScope.deleteMessage = false;
				$rootScope.editConfirm = true;
			}, function(err) {
				console.log("ERROR");
				console.log(err);
			});
		}

		reservationsVm.deleteReservationByConfCode = function(){
			console.log("Delete"+reservationsVm.reservations.confirmationcode);
			reservationService.deleteReservation(reservationsVm.reservations.confirmationcode).then(function(data) { 	
				reservationsVm.reservation = data;
				$rootScope.showReservation = false;
				$rootScope.modifyReservation = false;
				$rootScope.deleteMessage = true;
				$rootScope.editConfirm = false;
				reservationsVm.reservations.confirmationcode = null;
			}, function(err) {
				console.log(err);
			});
		};


		reservationsVm.addReservationByOwner = function(){
			console.log("Add reservation function");
			console.log(reservationsVm.reservations.reservation); 
			reservationService.addReservationByOwner(reservationsVm.reservations.reservation).then(function(data) {
				reservationsVm.newConfcode = data.confirmationcode;
				$rootScope.confirmation = true;
				$rootScope.makeReservation = false;	
					reservationsVm.reservations.reservation = null;
				
			}, function(err) {
				console.log(err);
			});	
		}

		reservationsVm.addReservationByCustomers = function(){
			alert("Confirm");
			console.log("Add reservation function");
			console.log(reservationsVm.reservations.reservation); 
			reservationService.addReservationByCustomers(reservationsVm.reservations.reservation).then(function(data) {
				reservationsVm.newConfcode = data.confirmationcode;
				$rootScope.confirmation = true;
				$rootScope.makeReservation = false;
				reservationsVm.reservations.reservation = null;
			}, function(err) {
				console.log(err);
			});
		}   
	}
	
	
})();

