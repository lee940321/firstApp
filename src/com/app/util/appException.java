package com.app.util;

public class appException extends Exception {
	private String resutlMsg;
	
	public appException(String resutlMsg){
		this.resutlMsg = resutlMsg;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return resutlMsg;
	}
	
}
