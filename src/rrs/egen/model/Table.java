package rrs.egen.model;

import java.sql.Time;
import java.sql.Date;

public class Table {
 private int tableId;
 private int seatingCapacity;
 private Boolean isOccupied;
 private Date date;
 private Time time;
 private int confirmationcode;
 
public int getConfirmationcode() {
	return confirmationcode;
}
public void setConfirmationcode(int confirmationcode) {
	this.confirmationcode = confirmationcode;
}
public int getTableId() {
	return tableId;
}
public Date getDate() {
	return date;
}
public void setDate(Date date) {
	this.date = date;
}
public Time getTime() {
	return time;
}
public void setTime(Time time) {
	this.time = time;
}
public void setTableId(int tableId) {
	this.tableId = tableId;
}
public int getSeatingCapacity() {
	return seatingCapacity;
}
public void setSeatingCapacity(int seatingCapacity) {
	this.seatingCapacity = seatingCapacity;
}
public Boolean getIsOccupied() {
	return isOccupied;
}
public void setIsOccupied(Boolean isOccupied) {
	this.isOccupied = isOccupied;
}
 
 
}
