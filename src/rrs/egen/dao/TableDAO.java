package rrs.egen.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import rrs.egen.exception.AppException;
import rrs.egen.model.Table;
import rrs.egen.util.DBUtils;

public class TableDAO {


	public List<Table> getAllTables() throws AppException{

		List<Table> table = new ArrayList<Table>();

		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement("SELECT * FROM tables");
			rs = ps.executeQuery();

			while(rs.next()){
				Table tab = new Table();
				tab.setTableId(rs.getInt("tableId"));
				tab.setSeatingCapacity(rs.getInt("seatingCapacity"));
				tab.setIsOccupied(rs.getBoolean("isOccupied"));
				tab.setDate(rs.getDate("date"));
				tab.setTime(rs.getTime("time"));
				tab.setConfirmationcode(rs.getInt("confirmationcode"));


				table.add(tab);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(),e.getCause());
		}

		return table;
	}


	public Table getTableById(int id) throws AppException{

		Table tab = null;

		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement("SELECT * FROM tables WHERE tableId=?");
			ps.setInt(1, id);

			rs = ps.executeQuery();

			if(rs.next()){
				tab = new Table();
				tab.setTableId(rs.getInt("tableId"));
				tab.setSeatingCapacity(rs.getInt("seatingCapacity"));
				tab.setIsOccupied(rs.getBoolean("isOccupied"));
				tab.setDate(rs.getDate("date"));
				tab.setTime(rs.getTime("time"));
				tab.setConfirmationcode(rs.getInt("confirmationcode"));
				

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(),e.getCause());
		}
		
		return tab;
	}


	public Table updateTableStatus(int id,Table tab) throws AppException {
		Connection conn = DBUtils.connect();
		PreparedStatement ps = null;
		ResultSet rs = null;

		try {
			ps = conn.prepareStatement("UPDATE tables SET seatingCapacity=?, isOccupied= ?, "
					+ "date =?,time = ?, confirmationCode = ? WHERE tableId=?");

			ps.setInt(1,tab.getSeatingCapacity());
			ps.setBoolean(2,tab.getIsOccupied());
			ps.setDate(3, tab.getDate());
			ps.setTime(4, tab.getTime());
			ps.setInt(5, tab.getConfirmationcode());
			
			ps.setInt(6, id);

			ps.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new AppException(e.getMessage(), e.getCause());
		} finally {
			DBUtils.closeConnection(ps, rs, conn);
		}
		return tab;
	}
}
