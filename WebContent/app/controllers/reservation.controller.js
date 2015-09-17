(function(){
	'use strict';

	angular.module('angularApp').controller('ReservationsController', ReservationsControllerFn);

	ReservationsControllerFn.$inject = ['reservationService','updateReservationService','deleteReservationService'];
	function ReservationsControllerFn(reservationService,updateReservationService,deleteReservationService) {
		var reservationsVm = this;
		reservationsVm.showReservation = false;
		reservationsVm.deleteMessage = false;  
		reservationsVm.confirmation = false;
		reservationsVm.editRow=false;
		reservationsVm.makeReservation=true;
		reservationsVm.reservationsGrid = true;
		reservationService.getReservations()
		.then(function(result){
			reservationsVm.reservations = result;
		},function(error){
			console.log("error");
		});

		var confCodeUpdateOwner = null;
		reservationsVm.editResvnRow=function(confCode){
			confCodeUpdateOwner = confCode;
			console.log(confCode);
			reservationsVm.editRow = true;
			reservationsVm.reservationsGrid = false;
		}

		reservationsVm.clear = function(){
			reservationsVm.reservations.reservation = null;
		}

		reservationsVm.showReservationByConfCode = function(){
			console.log("SHOW"+reservationsVm.reservations.confirmationcode);
			reservationService.getReservationByConfirmationCode(reservationsVm.reservations.confirmationcode).then(function(data) {
				reservationsVm.reservation = data;
				reservationsVm.showReservation = true;
				reservationsVm.modifyReservation = false;
				reservationsVm.deleteMessage = false;
				reservationsVm.editConfirm = false;
				reservationsVm.reservations.confirmationcode = null;
			}, function(err) {
				alert("invalid confirmation code");
			});
		}

		reservationsVm.modifyReservationByConfCode = function(){
			console.log("modify"+reservationsVm.reservations.confirmationcode);
			reservationService.getReservationByConfirmationCode(reservationsVm.reservations.confirmationcode).then(function(data) {
				reservationsVm.reservation = data;
				reservationsVm.showReservation = false;
				reservationsVm.modifyReservation = true;
				reservationsVm.deleteMessage = false;
				reservationsVm.editConfirm = false;
			}, function(err) {
				alert("invalid confirmation code");
			});
		};

		var confCodeUpdateOwner = null;
		reservationsVm.editResvnRow=function(confCode){
			confCodeUpdateOwner = confCode;
			console.log(confCode);
			reservationsVm.editRow = true;
			reservationsVm.reservationsGrid = false;
		}
		reservationsVm.clear = function(){
			reservationsVm.reservations.reservation = null;
		}

		reservationsVm.updateResvnStatus= function(){
			console.log("Update registration owner"+confCodeUpdateOwner);
			console.log("Update Data");
			console.log(reservationsVm.reservations.reservation);
			updateReservationService.updateRegStatusOwner(confCodeUpdateOwner, reservationsVm.reservations.reservation)
			.then(function(data) {
				console.log(data);
				reservationsVm.reservation = data;
				reservationsVm.editRow=false;
				reservationsVm.reservationsGrid = true;
			}, function(err) {
				console.log(err);
			});

		}


		reservationsVm.updateReservationByCustomers = function(){
			console.log("Update reservation confirmation code");
			console.log(reservationsVm.reservation.confirmationcode);
			console.log("Update reservation function DATA");
			console.log(reservationsVm.reservations.reservation);
			var confCode= reservationsVm.reservation.confirmationcode; 
			updateReservationService.updateReservationByCustomer(confCode,reservationsVm.reservations.reservation)
			.then(function(data) {
				console.log("UPDATE CONTROLLER Reservation");
				console.log(data);
				reservationsVm.updatedReservation = data;
				reservationsVm.reservations.reservation=null;
				reservationsVm.reservations.confirmationcode = null;
				reservationsVm.showReservation = false;
				reservationsVm.modifyReservation = false;
				reservationsVm.deleteMessage = false;
				reservationsVm.editConfirm = true;
			}, function(err) {
				console.log("ERROR");
				console.log(err);
			});
		}
		

		reservationsVm.deleteReservationByConfCode = function(){
			console.log("Delete"+reservationsVm.reservations.confirmationcode);
			deleteReservationService.deleteReservation(reservationsVm.reservations.confirmationcode).then(function(data) { 	
				reservationsVm.reservation = data;
				reservationsVm.showReservation = false;
				reservationsVm.modifyReservation = false;
				reservationsVm.deleteMessage = true;
				reservationsVm.editConfirm = false;
				reservationsVm.reservations.confirmationcode = null;
			}, function(err) {
				alert("invalid confirmation code");
			});
		};
		
		



	}
})();

