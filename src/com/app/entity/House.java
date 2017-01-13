package com.app.entity;

public class House {

	private int hId;
	
	private String hName;
	
	private String hType;
	
	private String hDate;
	
	private double money;
	
	private String memos;
	
	private String picture;
	
	public int gethId() {
		return hId;
	}
	public void sethId(int hId) {
		this.hId = hId;
	}
	public String gethName() {
		return hName;
	}
	public void sethName(String hName) {
		this.hName = hName;
	}
	public String gethType() {
		return hType;
	}
	public void sethType(String hType) {
		this.hType = hType;
	}
	public String gethDate() {
		return hDate;
	}
	public void sethDate(String hDate) {
		this.hDate = hDate;
	}
	public double getMoney() {
		return money;
	}
	public void setMoney(double money) {
		this.money = money;
	}
	public String getMemos() {
		return memos;
	}
	public void setMemos(String memos) {
		this.memos = memos;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	
}
