 package rrs.egen.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import rrs.egen.dao.CustomerDAO;
import rrs.egen.exception.AppException;
import rrs.egen.model.Customer;



@Path("/customers")
@Api(tags = {"/customers"})
public class CustomerController {


	//Read all Customers-- GET
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(
			value = "Find All Customers",
			notes = "Finds all Customer in the Database"
			)
	@ApiResponses(
			value={
					@ApiResponse(code=200, message = "Success"),
					@ApiResponse(code=500, message = "Internal Server Error")
			}
			)

	public List<Customer> getAll(){
		List<Customer> customers = null;
		try {
			CustomerDAO dao = new CustomerDAO();
			customers = dao.getAllCustomers();
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}
		return customers;
	}

	
	@GET
	@Path("/queries")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(
			value = "Find All Customers",
			notes = "Finds all Customer in the Database"
			)
	@ApiResponses(
			value={
					@ApiResponse(code=200, message = "Success"),
					@ApiResponse(code=500, message = "Internal Server Error")
			}
			)

	public List<Customer> getAllCustomerQueries(){
		List<Customer> customers = null;
		try {
			CustomerDAO dao = new CustomerDAO();
			customers = dao.getAllCustomerQueries();
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}
		return customers;
	}
	
	@POST
	@Path("/queries")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Create new Customer query", 
					notes = "Creates a new entry in the customerQuery table ")
	@ApiResponses(
			value = { 
					@ApiResponse(code = 200, message = "Success"),
					@ApiResponse(code = 500, message = "Internal Server Error") 
					}
			)
	public Customer createCustomerQueries(Customer reserv) {
		CustomerDAO dao = new CustomerDAO();
		try {
			System.out.println("Inside POST "+ reserv);
			reserv = dao.customerQueries(reserv);
			System.out.println(reserv);
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}
			
		return reserv;
	}

	
}
