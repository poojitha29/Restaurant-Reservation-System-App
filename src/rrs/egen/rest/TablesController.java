package rrs.egen.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response.Status;

import rrs.egen.dao.TableDAO;
import rrs.egen.exception.AppException;
import rrs.egen.model.Table;



@Path("/tables")
@Api(tags = {"/tables"})

public class TablesController {


	//Read all Tables-- GET
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(
			value = "Find All Tables",
			notes = "Finds all Tables in the Database"
			)
	@ApiResponses(
			value={
					@ApiResponse(code=200, message = "Success"),
					@ApiResponse(code=500, message = "Internal Server Error")
			}
			)

	public List<Table> getAll(){
		List<Table> tables = null;
		try {
			TableDAO dao = new TableDAO();
			tables = dao.getAllTables();
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}
		return tables;
	}


	//Read Table by ID-- GET
	@GET
	@Path("/{id}")
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
	public Table getByID(@PathParam("id") int tableId){
		Table tab;
		try {
			TableDAO dao = new TableDAO();
			tab = dao.getTableById(tableId);
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}
		return tab;
	}



	//Update Table by username-- PUT

	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(
			value = "Update a Table", 
			notes = "Update Table in the database using username"
			)
	@ApiResponses(
			value = { 
					@ApiResponse(code = 200, message = "Success"),
					@ApiResponse(code = 500, message = "Internal Server Error") 
					}
			)
	public Table updateTableByUsername(@PathParam("id") int tableId,Table tab) {
		TableDAO dao = new TableDAO();
		try {
			tab = dao.updateTableStatus(tableId, tab);
		} catch (AppException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new WebApplicationException(Status.INTERNAL_SERVER_ERROR);
		}
		return tab;
	}


}
