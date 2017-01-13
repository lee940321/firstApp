package com.app.service;

import java.util.List;

import com.app.entity.Account;

public interface AccountService {

	/** 显示所有信息*/
	public List<Account> getAcc();
	
	public List<Account> getAccByName(String Name);

	public void addAcc(Account acc);
	
	public void updateAcc(Account acc);
	
	public void deleteAccList(List<Integer> idList);
	
	public int getCount();
	
	public List<Account> getPageAcc(int start,int list);
	
	public String getPageAccJson(int start,int list);
	
	public String PageListToJson(List<Account> list);
	
	/**根据id查询账户名并删除明细中相关数据*/
	public void deleteByName(Integer id);
	
	public List<String> getA(String name);
}
