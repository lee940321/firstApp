package com.app.service;

import java.util.List;

import com.app.entity.Cash;

public interface CashService {

	/** 显示所有信息*/
	public List<Cash> getCash();
	
	public int getCount();
	
	public List<Cash> getPageCash(int start,int list);
	
	public String getPageCashJson(int start,int list);
	
	public String PageListToJson(List<Cash> list);
	
    public void addCash(Cash cash);
	
	public void updateCash(Cash cash);
	
	public void deleteCashList(List<Integer> idList);
	
	/**根据用户查询账户*/
	public List<String> getCByName(String name);
	
	public String getNameById(Integer id);
}
