package com.app.dao;

import java.util.List;

import com.app.entity.Bank;

public interface BankMapper {
    /**查询所有银行信息*/
    public List<Bank> getBank();
	
    /**根据银行名称查询所有银行信息*/
	public Bank getBankByName(String name);
	
	/**添加银行*/
	public void  addBank(Bank bank);

	/**更改银行信息*/
	public  void updateBank(Bank bank);
	
	/**批量删除银行信息*/
	public void deleteBank(List<Integer> idList);
	
	/**分页查询银行信息*/
	public List<Bank> getPageBank(int param1,int param2);
}
