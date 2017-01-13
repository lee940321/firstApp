package com.app.entity;

public class Account {

	private int accountId;
	private String atype;
    private String bName;
	private String mName;
	private String openDate;
	private String flag;
	private double asum;
	private String picture;
	private String memos;
	
	public int getAccountId() {
		return accountId;
	}
	public void setAccountId(int accountId) {
		this.accountId = accountId;
	}
	public String getAtype() {
		return atype;
	}
	public void setAtype(String atype) {
		this.atype = atype;
	}
	
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public double getAsum() {
		return asum;
	}
	public void setAsum(double asum) {
		this.asum = asum;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getMemos() {
		return memos;
	}
	public void setMemos(String memos) {
		this.memos = memos;
	}
	public String getbName() {
		return bName;
	}
	public void setbName(String bName) {
		this.bName = bName;
	}
	public String getmName() {
		return mName;
	}
	public void setmName(String mName) {
		this.mName = mName;
	}

	public String getOpenDate() {
		return openDate;
	}
	public void setOpenDate(String openDate) {
		this.openDate = openDate;
	}
}
