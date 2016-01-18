package rrs.egen.exception;

public class AppException extends Exception {
	
	private static final long serialVersionUID = -1094214126560388924L;
	
	
	public AppException(String arg){
		super(arg);
	}
	
	public AppException(String msg, Throwable cause){
		super(msg,cause);
	}

}
