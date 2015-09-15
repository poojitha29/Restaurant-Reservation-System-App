package rrs.egen.model;


import java.sql.Date;


public class Reservation {
	

	private int confirmationcode;
	private int partysize;
	private String date;
	private String time;
	private String fullname; 
	private double phone; 

	private String comments;
	private int tableId;
	
	private String email;
	private String status;
	public String getStatus() {
		return status;

	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getConfirmationcode() {
		return confirmationcode;
	}
	public void setConfirmationcode(int confirmationcode) {
		this.confirmationcode = confirmationcode;
	}

	public int getPartysize() {
		return partysize;
	}
	public void setPartysize(int partysize) {
		this.partysize = partysize;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}

	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public int getTableId() {
		return tableId;
	}
	public void setTableId(int tableId) {
		this.tableId = tableId;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public double getPhone() {
		return phone;
	}
	public void setPhone(double phone) {
		this.phone = phone;
	}


	
	
	
}
