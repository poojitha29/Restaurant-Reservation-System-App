package rrs.egen.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import rrs.egen.exception.AppException;
import rrs.egen.model.Customer;
import rrs.egen.util.DBUtils;

public class CustomerDAO {

	public List<Customer> getAllCustomers() throws AppException{

		List<Customer> customer = new ArrayList<Customer>();

		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement("SELECT * FROM  customers");
			rs = ps.executeQuery();

			while(rs.next()){
				Customer cust = new Customer();
				cust.setFullname(rs.getString("fullname"));
				cust.setPhone(rs.getInt("phone"));
				cust.setEmail(rs.getString("email"));
				
				customer.add(cust);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(),e.getCause());
		}
		finally{
			DBUtils.closeConnection(ps, rs, conn);
		}

		return customer;
	}



	public Customer customerQueries(Customer cust) throws AppException{

		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement("INSERT INTO `customerQueries`(`fullname`,`phone`,`email`,`comments`) VALUES (?,?,?,?)",PreparedStatement.RETURN_GENERATED_KEYS);
			ps.setString(1,cust.getFullname());
			ps.setInt(2, cust.getPhone());
			ps.setString(3, cust.getEmail());
			ps.setString(4, cust.getComments());
						
			ps.executeUpdate();
			
			rs = ps.getGeneratedKeys();
			if(rs.next()){
				cust.setCustomerId(rs.getInt(1));
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(),e.getCause());
		}finally{
			DBUtils.closeConnection(ps, rs, conn);
		}


		return cust;
	}
	
	

	


}