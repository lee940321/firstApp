package com.app.dao;

import java.util.List;

import com.app.entity.Account;

public interface AccountMapper {
	/**查询所有账户信息*/
	public List<Account> getAcc();
	
	/**根据账户名查询所有账户信息*/
	public List<Account> getAccByName(String name);
	
	/**添加账户信息*/
	public void  addAcc(Account acc);

	/**更改账户信息*/
	public void updateAcc(Account acc);
	
	/**批量删除账户信息*/
	public void deleteAcc(List<Integer> idList);
	
	/**分页查询账户信息*/
	public List<Account> getPageAcc(int param1,int param2);
	
	/**根据id查询账户名*/
	public String findNameById(Integer id);

	/**根据用户查账号*/
	public List<String> getA(String name);
}
