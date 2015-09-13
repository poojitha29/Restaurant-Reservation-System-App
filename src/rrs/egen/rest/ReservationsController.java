package rrs.egen.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import rrs.egen.dao.ReservationDAO;
import rrs.egen.exception.AppException;
import rrs.egen.model.Reservation;

@Path("/reservations")
@Api(tags = {"/reservations"})
public class ReservationsController {

	
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(
			value = "Create new Reservation", 
			notes = "Creates anew entry in the reservation table for a particular Customer"
			)
	@ApiResponses(
			value = { 
					@ApiResponse(code = 200, message = "Success"),
					@ApiResponse(code = 500, message = "Internal Server Error") 
					}
			)
	public Reservation createReservationByCust(Reservation reserv) {
		ReservationDAO dao = new ReservationDAO();
		try {
			dao.createReservationByCustomer(reserv);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}

		return reserv;
	}

	
	// Update existing Reservation using confirmation code by customer -- PUT
		@PUT
		@Path("/{confCode}")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		@ApiOperation(
				value = "Update reservation", 
				notes = "Update an entry in the Reservation table using Confirmation code"
				)
		@ApiResponses(
				value = { 
						@ApiResponse(code = 200, message = "Success"),
						@ApiResponse(code = 404, message = "Not Found"),
						@ApiResponse(code = 500, message = "Internal Server Error") 
						}
				)
		public Reservation updateReservationByConfCode( @PathParam("confCode") int confCode, Reservation reserv) {
			ReservationDAO dao = new ReservationDAO();
			try {
				reserv = dao.updateReservationByCustomer(confCode, reserv);
			} catch (AppException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
			}
			return reserv;
		}
		
		

		@DELETE
		@Path("/{confCode}")
		@ApiOperation(
				value = "Delete a reservation", 
				notes = "Delete a reservation for a customer using Confirmation code"
				)
		@ApiResponses(
				value = { 
						@ApiResponse(code = 200, message = "Success"),
						@ApiResponse(code = 404, message = "Not Found"),
						@ApiResponse(code = 500, message = "Internal Server Error") 
						}
				)
		public void deleteReservationByCustomer(@PathParam("confCode") int confCode,
				@PathParam("confirmation-code") int ccode) {
			ReservationDAO dao = new ReservationDAO();
			try {
				dao.deleteReservationByCustomer(confCode);
			} catch (AppException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
			}
		}

		
		
		
		

}
