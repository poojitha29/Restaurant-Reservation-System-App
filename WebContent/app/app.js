(function(){
    'use strict';

  angular.module('angularApp', []);

  angular.module('angularApp').controller('ReservationsController', ReservationsControllerFn);

  ReservationsControllerFn.$inject = ['$rootScope','reservationService'];
  function ReservationsControllerFn($rootScope,reservationService) {
    var reservationsVm = this;
    $rootScope.showReservation = false;
    $rootScope.deleteMessage = false;  
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


    reservationsVm.showReservationByConfCode = function(){
    	console.log("SHOW"+reservationsVm.reservations.confirmationcode);
		reservationService.getReservationByConfirmationCode(reservationsVm.reservations.confirmationcode).then(function(data) {
	    
	    	//console.log(data);
	    		reservationsVm.reservation = data;
	    		$rootScope.showReservation = true;
	    		$rootScope.modifyReservation = false;
	    		$rootScope.deleteMessage = false;
	    		reservationsVm.reservations.confirmationcode = null;
	    	
	    }, function(err) {
	    	console.log(err);
	    });
	};
	 reservationsVm.modifyReservationByConfCode = function(){
	    	console.log("modify"+reservationsVm.reservations.confirmationcode);
			reservationService.getReservationByConfirmationCode(reservationsVm.reservations.confirmationcode).then(function(data) {
		    
		    	//console.log(data);
		    		reservationsVm.reservation = data;
		    		$rootScope.showReservation = false;
		    		$rootScope.modifyReservation = true;
		    		$rootScope.deleteMessage = false;
		    		
		    	
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
    	reservationService.updateReservationByCustomer(confCode,reservationsVm.reservations.reservation).then(function(data) {
  	    	
  	    		console.log("UPDATE CONTROLLER Reservation");
  	    		console.log(data);
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
	    		reservationsVm.reservations.confirmationcode = null;
	    	
	    }, function(err) {
	    	console.log(err);
	    });
	};


    reservationsVm.addReservationByOwner = function(){
    	 console.log("Add reservation function");
    	console.log(reservationsVm.reservations.reservation); 
		reservationService.addReservationByOwner(reservationsVm.reservations.reservation).then(function(data) {
	    	if(data.status == "success"){
	    		console.log("reservation");
	    		console.log(data.message);
	    	}
	    }, function(err) {
	    	console.log(err);
	    });	
    }

    reservationsVm.addReservationByCustomers = function(){
    	console.log("Add reservation function");
    	console.log(reservationsVm.reservations.reservation); 
		reservationService.addReservationByCustomers(reservationsVm.reservations.reservation).then(function(data) {
	    	if(data.status == "success"){
	    		console.log("reservation");
	    		console.log(data.message);
	    	}
	    }, function(err) {
	    	console.log(err);
	    });
    }   

    
    
   
    
  }
})();

