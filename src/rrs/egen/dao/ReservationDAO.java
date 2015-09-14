package rrs.egen.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import rrs.egen.exception.AppException;
import rrs.egen.model.Customer;
import rrs.egen.model.Reservation;
import rrs.egen.model.Table;
import rrs.egen.util.DBUtils;


public class ReservationDAO {
	
	
	public static int randInt(int min, int max) {

	    Random rand = new Random();
	    int randomNum = rand.nextInt((max - min) + 1) + min;
	    return randomNum;
	}
	
	
	public List<Reservation> getAllReservations() throws AppException{

		List<Reservation> reservation = new ArrayList<Reservation>();

		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement("SELECT reservations.partysize, reservations.date, reservations.time, reservations.email, reservations.comments, reservations.confirmationcode, reservations.status, reservations.tableId FROM customers inner join reservations where reservations.email = customers.email;");
			rs = ps.executeQuery();

			while(rs.next()){
				Reservation reserv = new Reservation();
				
				reserv.setPartysize(rs.getInt("partysize"));
				reserv.setDate(rs.getDate("date"));
				reserv.setTime(rs.getString("time"));
				reserv.setEmail(rs.getString("email"));
				reserv.setComments(rs.getString("comments"));
				reserv.setConfirmationcode(rs.getInt("confirmationcode"));
				reserv.setStatus(rs.getString("status"));
				reserv.setTableId(rs.getInt("tableId"));
				
				reservation.add(reserv);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(),e.getCause());
		}
		finally{
			DBUtils.closeConnection(ps, rs, conn);
		}

		return reservation;
	}
	
	public Reservation getReservationById(int id) throws AppException{

		
		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;
		Reservation reserv = new Reservation();

		try {
			ps = conn.prepareStatement("SELECT reservations.partysize, reservations.date, reservations.time, reservations.email, reservations.comments, reservations.confirmationcode, reservations.status, reservations.tableId FROM customers inner join reservations where reservations.confirmationcode = ? AND reservations.email = customers.email");
			ps.setInt(1, id);

			rs = ps.executeQuery();

			if(rs.next()){
				
				reserv.setPartysize(rs.getInt("partysize"));
				reserv.setDate(rs.getDate("date"));
				reserv.setTime(rs.getString("time"));
				reserv.setEmail(rs.getString("email"));
				reserv.setComments(rs.getString("comments"));
				reserv.setConfirmationcode(rs.getInt("confirmationcode"));
				reserv.setStatus(rs.getString("status"));
				reserv.setTableId(rs.getInt("tableId"));
				

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(),e.getCause());
		}
		
		return reserv;
	}
	
	public Reservation createReservationByCustomer(Reservation reserv) throws AppException {
		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		PreparedStatement ps1 = null;
		ResultSet rs = null;
		ResultSet rs1 = null;
		try {
			ps = conn.prepareStatement(	
					"INSERT INTO reservations (partysize,date,time,email,comments) VALUES (?,?,?,?,?)",PreparedStatement.RETURN_GENERATED_KEYS);
			//partysize,date,time,email,comments,confirmationcode
			ps.setInt(1,reserv.getPartysize());
			ps.setDate(2, reserv.getDate());
			ps.setString(3, reserv.getTime());
			ps.setString(4, reserv.getEmail());
			ps.setString(5, reserv.getComments());
			
			ps.executeUpdate();
			rs = ps.getGeneratedKeys();

			
			
			ps1 = conn.prepareStatement("INSERT INTO customers (fullname, phone, email) VALUES (?,?,?)");
			ps1.setString(1, reserv.getFullname());
			ps1.setInt(2, reserv.getPhone());
			ps1.setString(3, reserv.getEmail());
			ps1.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(), e.getCause());
		} 
		 finally {
			DBUtils.closeConnection(ps, rs, conn);
		}

		return reserv;

	}
	public Reservation createReservationByOwner(Reservation reserv) throws AppException {
		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;
		PreparedStatement ps1 = null;
		ResultSet rs1 = null;
		Customer cust = null;
		try {
			ps = conn.prepareStatement(	
					"INSERT INTO reservations (partysize,date,time,email,comments) VALUES (?,?,?,?,?)",PreparedStatement.RETURN_GENERATED_KEYS);
			//partysize,date,time,email,comments,confirmationcode
			ps.setInt(1,reserv.getPartysize());
			ps.setDate(2, reserv.getDate());
			ps.setString(3, reserv.getTime());
			ps.setString(4, reserv.getEmail());
			ps.setString(5, reserv.getComments());
			
			ps.executeUpdate();
			rs = ps.getGeneratedKeys();

			if (rs.next()) {
				reserv.setConfirmationcode(rs.getInt(1));	
			}
			
			
			ps1 = conn.prepareStatement("INSERT INTO customers (fullname, phone, email) VALUES (?,?,?)");
			ps1.setString(1, reserv.getFullname());
			ps1.setInt(2, reserv.getPhone());
			ps1.setString(3, reserv.getEmail());
			ps1.executeUpdate();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(), e.getCause());
		} finally {
			DBUtils.closeConnection(ps, rs, conn);
		}

		return reserv;

	}


	
	public Reservation updateReservationByCustomer(int confCode, Reservation reserv) throws AppException {
		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement(	"UPDATE reservations SET partysize=?, date = ?, time = ?, comments = ? WHERE confirmationCode = ?");

			ps.setInt(1, reserv.getPartysize());
			ps.setDate(2, reserv.getDate());
			ps.setString(3, reserv.getTime());
			ps.setString(4, reserv.getComments());
			ps.setInt(5, confCode);
			
			ps.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(), e.getCause());
		} finally {
			DBUtils.closeConnection(ps, rs, conn);
		}

		return reserv;
	}

	
	public Reservation updateReservationByOwnerOnly(int confCode, Reservation reserv) throws AppException {
		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement(	"UPDATE reservations SET tableId=?, status = ? WHERE confirmationCode = ?");

			ps.setInt(1, reserv.getTableId());
			ps.setString(2, reserv.getStatus());
			ps.setInt(3, confCode);
			
			ps.executeUpdate();

		} 

		
		
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(), e.getCause());
		} finally {
			DBUtils.closeConnection(ps, rs, conn);
		}

		return reserv;
	}

	
	public void deleteReservationByCustomer( int confCode) throws AppException {
		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement("DELETE FROM reservations WHERE confirmationcode=?");
			
			ps.setInt(1, confCode);

			ps.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(), e.getCause());
		} finally {
			DBUtils.closeConnection(ps, rs, conn);
		}
	}

	
	public void deleteReservationOwner(int condCode) throws AppException {
		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement("DELETE FROM reservations WHERE confirmationcode = ? ");
			ps.setInt(1, condCode);
			

			ps.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(), e.getCause());
		} finally {
			DBUtils.closeConnection(ps, rs, conn);
		}
	}

	

}
