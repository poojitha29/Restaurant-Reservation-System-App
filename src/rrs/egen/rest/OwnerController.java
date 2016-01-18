package rrs.egen.rest;

import java.util.List;

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








import rrs.egen.dao.OwnerDAO;
import rrs.egen.dao.ReservationDAO;
import rrs.egen.exception.AppException;
import rrs.egen.model.Owner;
import rrs.egen.model.Reservation;



@Path("/owners")
@Api(tags = {"/owners"})

public class OwnerController {

	//Read Owner by ID (username)-- GET
	@GET
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(
			value = "Find Owner- for Login",
			notes = "Find owner using OwnerId which is same as the owner username"
			)
	@ApiResponses(
			value={
					@ApiResponse(code=200, message = "Success"),
					@ApiResponse(code=404, message = "Not Found"),
					@ApiResponse(code=500, message = "Internal Server Error")
			}
			)
	public Owner getLogin(){
		Owner own ;
		try {
			OwnerDAO dao = new OwnerDAO();
			own = dao.getOwner();
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}
		return own;
	}


	@GET
	@Path("/reservations")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(
			value = "Find All Reservation", 
			notes = "Finds all reservations"
			)
	@ApiResponses(
			value = { 
					@ApiResponse(code = 200, message = "Success"),
					@ApiResponse(code = 500, message = "Internal Server Error") 
			}
			)
	public List<Reservation> getAllReservation() {
		List<Reservation> reservations = null;

		ReservationDAO dao = new ReservationDAO();
		try {
			reservations = dao.getAllReservations();
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}

		return reservations;
	}



	@POST
	@Path("/reservations/new")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(
			value = "Create Reservation for Owner", 
			notes = "Creates a reservation for Owner in the database (Default CustomerId for owner is 999999)"
			)
	@ApiResponses(
			value = { 
					@ApiResponse(code = 200, message = "Success"),
					@ApiResponse(code = 500, message = "Internal Server Error") 
			}
			)
	public Reservation createReservation(Reservation reserv) {
		ReservationDAO dao = new ReservationDAO();
		try {
			reserv = dao.createReservationByOwner(reserv);
			System.out.println( "inside Create reservation by owner Controller"+"\n"+reserv);
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}
		return reserv;
	}








	@PUT
	@Path("/reservations/{confCode}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(
			value = "Update a reservation(tableId and Status)", 
			notes = "Update tableId and Status of a reservation entry in the database using reservation ID"
			)
	@ApiResponses(
			value = { 
					@ApiResponse(code = 200, message = "Success"),
					@ApiResponse(code = 404, message = "Not Found"),
					@ApiResponse(code = 500, message = "Internal Server Error") 
			}
			)
	public Reservation updateReservation(@PathParam("confCode") int confCode, Reservation reserv) {
		ReservationDAO dao = new ReservationDAO();
		try {
			reserv = dao.updateReservationByOwnerOnly(confCode, reserv);
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}
		return reserv;
	}




	@DELETE
	@Path("/reservations/{reservId}")
	@ApiOperation(
			value = "Delete a reservation", 
			notes = "Delete a reservation entry  in the database using reservation ID"
			)
	@ApiResponses(
			value = { 
					@ApiResponse(code = 200, message = "Success"),
					@ApiResponse(code = 404, message = "Not Found"),
					@ApiResponse(code = 500, message = "Internal Server Error") 
			}
			)
	public void deleteReservation(@PathParam("reservId") int reservId) {
		ReservationDAO dao = new ReservationDAO();
		try {
			dao.deleteReservationOwner(reservId);
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}

	}

}
