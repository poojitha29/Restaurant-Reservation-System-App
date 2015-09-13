package rrs.egen.model;


import java.sql.Date;
import java.sql.Time;


public class Reservation {
	

	private int confirmationcode;
	private int partysize;
	private Date date;
	private Time time;
	private String fullname; 
	private int phone; 

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
	public Date getDate() {
		return date;
	}
	public void setDate(Date date2) {
		this.date = date2;
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
	public Time getTime() {
		return time;
	}
	public void setTime(Time time) {
		this.time = time;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public int getPhone() {
		return phone;
	}
	public void setPhone(int phone) {
		this.phone = phone;
	}


	
	
	
}
