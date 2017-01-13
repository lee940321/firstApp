package com.app.service;

import java.util.List;

import com.app.entity.Bank;


public interface BankService {

	/** 显示所有信息*/
	public List<Bank> getBank();
	
	public Bank getBankByName(String Name);
		
	
	/** 添加银行 */
	public void addBank(Bank bank);
	
	/**更新银行*/
	public void updateBank(Bank bank);
	
	/**删除银行*/
	public void deleteBankList(List<Integer> idList);
	
	public int getCount();
	
	public List<Bank> getPageBank(int start,int list);
	
	public String getPageBankJson(int start,int list);
	
	public String PageListToJson(List<Bank> list);
	
}
