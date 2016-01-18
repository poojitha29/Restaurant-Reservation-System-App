package rrs.egen.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import rrs.egen.exception.AppException;
import rrs.egen.model.Owner;
import rrs.egen.util.DBUtils;

public class OwnerDAO {

	
	public Owner getOwner() throws AppException{

		Owner own = new Owner();;

		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement("SELECT * FROM owner");
			
			rs = ps.executeQuery();

			if(rs.next()){
				own = new Owner();
				own.setUsername(rs.getString("username"));
				own.setPassword(rs.getString("password"));	
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(),e.getCause());
		}

		return own;
	}

}
