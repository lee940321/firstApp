package com.app.entity;

public class Cash {

	private int cId;
	
	private String cName;
	
	private String mName;
	
	private String openDate;
	
	private String cType;
	
	private double csum;
	
	private String memos;
	
	public int getcId() {
		return cId;
	}
	public void setcId(int cId) {
		this.cId = cId;
	}
	public String getcName() {
		return cName;
	}
	public void setcName(String cName) {
		this.cName = cName;
	}
	public String getmName() {
		return mName;
	}
	public void setmName(String mName) {
		this.mName = mName;
	}
	public String getcType() {
		return cType;
	}
	public void setcType(String cType) {
		this.cType = cType;
	}
	public double getCsum() {
		return csum;
	}
	public void setCsum(double csum) {
		this.csum = csum;
	}
	public String getMemos() {
		return memos;
	}
	public void setMemos(String memos) {
		this.memos = memos;
	}
	public String getOpenDate() {
		return openDate;
	}
	public void setOpenDate(String openDate) {
		this.openDate = openDate;
	}
}
