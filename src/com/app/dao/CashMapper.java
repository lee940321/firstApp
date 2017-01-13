package com.app.dao;

import java.util.List;

import com.app.entity.Cash;

public interface CashMapper {
    /**查询所有现金信息*/
    public List<Cash> getCash();
    
    /**分页查询现金信息*/
	public List<Cash> getPageCash(int param1,int param2);
	
	/**添加现金信息*/
	public void addCash(Cash cash);

	/**更新现金信息*/
	public void updateCash(Cash cash);
	
	/**批量删除现金信息*/
	public void deleteCash(List<Integer> idList);
	
	/**根据现金账户查询现金信息*/
	public List<String> getCByName(String name);
	
	/**根据ID查询现金信息*/
	public String getNameById(Integer id);

}
