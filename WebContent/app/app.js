(function(){
    'use strict';


  angular.module('angularApp', []);

  angular.module('angularApp').controller('ReservationsController', ReservationsControllerFn);

  ReservationsControllerFn.$inject = ['$rootScope','reservationService'];
  function ReservationsControllerFn($rootScope,reservationService) {
    var reservationsVm = this;
    

    	
    reservationsVm.deleteReservation = function(){
  		reservationService.deleteReservation(reservationsVm.confCode).then(function(data) {
  	    	if(data.status == "success"){
  	    		console.log(data.message);
  	    	}
  	    }, function(err) {
  	    	console.log(err);
  	    });
  		
  	}
      

      
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
    
    
    
    reservationsVm.makeReservation = function(){
		
		reservationService.makeReservation(reservationsVm.newReservation).then(function(data) {
	    	
	    		console.log(data.message);
	    	
	    }, function(err) {
	    	console.log(err);
	    });
	};
	
	
	reservationsVm.getReservationByConfirmationCode = function(){
		
		reservationService.getReservationByConfirmationCode($rootScope.confCode).then(function(data) {
	    	if(data.status == "success"){
	    		reservationsVm.reservation = data;
	    	}
	    }, function(err) {
	    	console.log(err);
	    });
	};

	
    reservationsVm.deleteReservationByOwner = function(){
    	console.log($rootScope.confCode);
  		reservationService.deleteReservationByOwner($rootScope.confCode).then(function(data) {
  	    	if(data.status == "success"){
  	    		console.log(data.message);
  	    	}
  	    }, function(err) {
  	    	console.log(err);
  	    });
  		
  	}
    
    
    reservationsVm.makeReservationByOwner = function(){
		console.log(reservationsVm.newReservation);
		reservationService.makeReservationByOwner(reservationsVm.newReservation).then(function(data) {
	    	
	    }, function(err) {
	    	console.log(err);
	    });
	};
    
      
  }
  
  

})();


/**
 {
   "username": "username",
   "password": "password"
 }
 */

/** customerQuery data
 [{
  "queryId": 1,
  "fullname": "Phyllis Lawrence",
  "phone": 7468679383,
  "email": "plawrence0@uol.com.br",
  "comments": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo."
}, {
  "queryId": 2,
  "fullname": "Anthony Burke",
  "phone": 8959706100,
  "email": "aburke1@shinystat.com",
  "comments": "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla."
}, {
  "queryId": 3,
  "fullname": "Brian Collins",
  "phone": 6193613068,
  "email": "bcollins2@yahoo.co.jp",
  "comments": "Duis ac nibh."
}, {
  "queryId": 4,
  "fullname": "Mildred Powell",
  "phone": 3015641587,
  "email": "mpowell3@themeforest.net",
  "comments": "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh."
}, {
  "queryId": 5,
  "fullname": "Jonathan Freeman",
  "phone": 6287417685,
  "email": "jfreeman4@marriott.com",
  "comments": "Pellentesque at nulla. Suspendisse potenti."
}, {
  "queryId": 6,
  "fullname": "Debra Ellis",
  "phone": 7991423562,
  "email": "dellis5@howstuffworks.com",
  "comments": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat."
}, {
  "queryId": 7,
  "fullname": "Joan Turner",
  "phone": 3755239521,
  "email": "jturner6@ocn.ne.jp",
  "comments": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat."
}, {
  "queryId": 8,
  "fullname": "Clarence Harvey",
  "phone": 7136974283,
  "email": "charvey7@pen.io",
  "comments": "Integer ac neque. Duis bibendum."
}, {
  "queryId": 9,
  "fullname": "Kathleen Rogers",
  "phone": 9270066109,
  "email": "krogers8@vimeo.com",
  "comments": "Nulla facilisi. Cras non velit nec nisi vulputate nonummy."
}, {
  "queryId": 10,
  "fullname": "Todd Daniels",
  "phone": 1056103808,
  "email": "tdaniels9@hostgator.com",
  "comments": "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante."
}, {
  "queryId": 11,
  "fullname": "Sara Black",
  "phone": 1822414964,
  "email": "sblacka@rakuten.co.jp",
  "comments": "Integer non velit."
}, {
  "queryId": 12,
  "fullname": "Sandra Dunn",
  "phone": 3230528801,
  "email": "sdunnb@nydailynews.com",
  "comments": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
}, {
  "queryId": 13,
  "fullname": "Andrea Warren",
  "phone": 1534560344,
  "email": "awarrenc@techcrunch.com",
  "comments": "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum."
}, {
  "queryId": 14,
  "fullname": "Douglas Turner",
  "phone": 1929561732,
  "email": "dturnerd@salon.com",
  "comments": "Etiam vel augue."
}, {
  "queryId": 15,
  "fullname": "Jonathan Porter",
  "phone": 9654726194,
  "email": "jportere@cbslocal.com",
  "comments": "Aenean fermentum. Donec ut mauris eget massa tempor convallis."
}]

 */


/** Reservation data
 [{
  "confirmationcode": 1,
  "partysize": 2,
  "date": "2015-09-23",
  "comments": "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque.",
  "email": "kwarren0@artisteer.com",
  "status": "org",
  "time": "1:39",
  "tableId": 8
}, {
  "confirmationcode": 2,
  "partysize": 11,
  "date": "2015-09-20",
  "comments": "Etiam vel augue. Vestibulum rutrum rutrum neque.",
  "email": "jgray1@cbslocal.com",
  "status": "gov",
  "time": "4:03",
  "tableId": 5
}, {
  "confirmationcode": 3,
  "partysize": 12,
  "date": "2015-09-23",
  "comments": "Suspendisse ornare consequat lectus.",
  "email": "agomez2@slate.com",
  "status": "net",
  "time": "7:12",
  "tableId": 6
}, {
  "confirmationcode": 4,
  "partysize": 5,
  "date": "2015-09-24",
  "comments": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.",
  "email": "dsimmons3@amazonaws.com",
  "status": "org",
  "time": "13:03",
  "tableId": 10
}, {
  "confirmationcode": 5,
  "partysize": 8,
  "date": "2015-09-24",
  "comments": "Praesent blandit. Nam nulla.",
  "email": "rbaker4@51.la",
  "status": "edu",
  "time": "10:57",
  "tableId": 1
}, {
  "confirmationcode": 6,
  "partysize": 8,
  "date": "2015-09-21",
  "comments": "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
  "email": "jgraham5@ning.com",
  "status": "net",
  "time": "11:19",
  "tableId": 1
}, {
  "confirmationcode": 7,
  "partysize": 12,
  "date": "2015-09-22",
  "comments": "Vivamus vestibulum sagittis sapien.",
  "email": "rmarshall6@studiopress.com",
  "status": "edu",
  "time": "4:52",
  "tableId": 5
}, {
  "confirmationcode": 8,
  "partysize": 1,
  "date": "2015-09-22",
  "comments": "Curabitur convallis.",
  "email": "mkim7@slashdot.org",
  "status": "mil",
  "time": "22:41",
  "tableId": 9
}, {
  "confirmationcode": 9,
  "partysize": 12,
  "date": "2015-09-24",
  "comments": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
  "email": "hdavis8@blogs.com",
  "status": "org",
  "time": "5:06",
  "tableId": 1
}, {
  "confirmationcode": 10,
  "partysize": 5,
  "date": "2015-09-23",
  "comments": "Nulla tempus.",
  "email": "akim9@businesswire.com",
  "status": "biz",
  "time": "8:55",
  "tableId": 1
}, {
  "confirmationcode": 11,
  "partysize": 6,
  "date": "2015-09-24",
  "comments": "Nulla nisl.",
  "email": "asimmonsa@cnet.com",
  "status": "mil",
  "time": "10:14",
  "tableId": 8
}, {
  "confirmationcode": 12,
  "partysize": 5,
  "date": "2015-09-24",
  "comments": "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.",
  "email": "cwilliamsb@toplist.cz",
  "status": "net",
  "time": "23:56",
  "tableId": 7
}, {
  "confirmationcode": 13,
  "partysize": 5,
  "date": "2015-09-21",
  "comments": "Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.",
  "email": "kdiazc@blinklist.com",
  "status": "gov",
  "time": "2:20",
  "tableId": 3
}, {
  "confirmationcode": 14,
  "partysize": 3,
  "date": "2015-09-21",
  "comments": "Nullam molestie nibh in lectus. Pellentesque at nulla.",
  "email": "rmendozad@hostgator.com",
  "status": "gov",
  "time": "20:32",
  "tableId": 7
}, {
  "confirmationcode": 15,
  "partysize": 1,
  "date": "2015-09-22",
  "comments": "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum.",
  "email": "rmcdonalde@uiuc.edu",
  "status": "info",
  "time": "21:49",
  "tableId": 6
}]
 */

/** customer data
 [{
  "customerId": 1,
  "fullname": "Virginia Schmidt",
  "phone": 9560394787,
  "email": "vschmidt0@hubpages.com"
}, {
  "customerId": 2,
  "fullname": "Edward Gibson",
  "phone": 2628594052,
  "email": "egibson1@naver.com"
}, {
  "customerId": 3,
  "fullname": "Theresa Payne",
  "phone": 8898933379,
  "email": "tpayne2@ocn.ne.jp"
}, {
  "customerId": 4,
  "fullname": "Johnny Martinez",
  "phone": 4455727335,
  "email": "jmartinez3@google.nl"
}, {
  "customerId": 5,
  "fullname": "Henry Garrett",
  "phone": 7727404245,
  "email": "hgarrett4@aboutads.info"
}, {
  "customerId": 6,
  "fullname": "Bobby Fields",
  "phone": 8176357717,
  "email": "bfields5@freewebs.com"
}, {
  "customerId": 7,
  "fullname": "Lisa Williams",
  "phone": 1854290114,
  "email": "lwilliams6@newyorker.com"
}, {
  "customerId": 8,
  "fullname": "Virginia Berry",
  "phone": 2098552184,
  "email": "vberry7@bloglines.com"
}, {
  "customerId": 9,
  "fullname": "Ernest Romero",
  "phone": 7557667249,
  "email": "eromero8@biblegateway.com"
}, {
  "customerId": 10,
  "fullname": "Russell Ryan",
  "phone": 9263006337,
  "email": "rryan9@sohu.com"
}]
 */


/** table data

[{"tableId":1,"seatingCapacity":12,"isOccupied":false,"date":"2015-09-24","time":"8:43:00","confirmationcode":4512900},
    {"tableId":2,"seatingCapacity":10,"isOccupied":true,"date":"2015-09-25","time":"15:41:20","confirmationcode":4893654},
    {"tableId":3,"seatingCapacity":5,"isOccupied":false,"date":"2015-09-26","time":"22:57:10","confirmationcode":4049676},
    {"tableId":4,"seatingCapacity":7,"isOccupied":true,"date":"2015-09-21","time":"7:07:11","confirmationcode":4624601},
    {"tableId":5,"seatingCapacity":11,"isOccupied":true,"date":"2015-09-21","time":"2:32:00","confirmationcode":4318067},
    {"tableId":6,"seatingCapacity":6,"isOccupied":false,"date":"2015-09-23","time":"23:12:02","confirmationcode":4667921},
    {"tableId":7,"seatingCapacity":7,"isOccupied":true,"date":"2015-09-21","time":"19:24:00","confirmationcode":4013623},
    {"tableId":8,"seatingCapacity":12,"isOccupied":true,"date":"2015-09-22","time":"19:14:00","confirmationcode":4106362},
    {"tableId":9,"seatingCapacity":11,"isOccupied":false,"date":"2015-09-24","time":"4:33:25","confirmationcode":4774606},
    {"tableId":10,"seatingCapacity":8,"isOccupied":false,"date":"2015-09-23","time":"12:37:01","confirmationcode":4348183}]

 */