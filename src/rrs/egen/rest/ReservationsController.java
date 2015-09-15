package rrs.egen.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import rrs.egen.dao.ReservationDAO;
import rrs.egen.dao.TableDAO;
import rrs.egen.exception.AppException;
import rrs.egen.model.Reservation;
import rrs.egen.model.Table;

@Path("/reservations")
@Api(tags = {"/reservations"})
public class ReservationsController {

	
	
	@POST
	@Path("/new")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Create new Reservation", 
					notes = "Creates anew entry in the reservation table for a particular Customer")
	@ApiResponses(
			value = { 
					@ApiResponse(code = 200, message = "Success"),
					@ApiResponse(code = 500, message = "Internal Server Error") 
					}
			)
	public Reservation createReservationByCust(Reservation reserv) {
		ReservationDAO dao = new ReservationDAO();
		try {
			
			reserv = dao.createReservationByCustomer(reserv);
		} catch (Exception e) {
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
				System.out.println(reserv);
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
		public void deleteReservationByCustomer(@PathParam("confCode") int confCode) {
			ReservationDAO dao = new ReservationDAO();
			try {
				dao.deleteReservationByCustomer(confCode);
			} catch (AppException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
			}
		}

		@GET
		@Path("/{confCode}")
		@Produces(MediaType.APPLICATION_JSON)
		@ApiOperation(
				value = "Find a Table",
				notes = "Finds a Table with a particular ID in the Database"
				)
		@ApiResponses(
				value={
						@ApiResponse(code=200, message = "Success"),
						@ApiResponse(code=404, message = "Not Found"),
						@ApiResponse(code=500, message = "Internal Server Error")
				}
				)
		public Reservation getByID(@PathParam("confCode") int confCode){
			Reservation reserv;
			
			try {
				ReservationDAO dao = new ReservationDAO();
				reserv = dao.getReservationById(confCode);
				System.out.println(reserv);
			} catch (AppException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
			}
			return reserv;
		}
		
		
		

}
