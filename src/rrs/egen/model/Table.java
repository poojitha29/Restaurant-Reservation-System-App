package rrs.egen.model;

public class Table {
 private int tableId;
 private int seatingCapacity;
 private String status;
 
 
public int getTableId() {
	return tableId;
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

public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
}

}