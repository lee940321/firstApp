package com.app.dao;

import java.util.List;

import com.app.entity.Inoutlist;

public interface InoutlistMapper {

	/**查询所有收支信息*/
    public List<Inoutlist> getList();
	
    /**根据名称查询收支信息*/
	public List<Inoutlist> getListByName(String name);
		
	/**添加收支信息*/
	public void addList(Inoutlist list);

	/**更新收支信息*/
	public void updateList(Inoutlist list);
	
	/**批量删除收支信息*/
	public void deleteList(List<Integer> idList);
	
	/**分页查询收支信息*/
	public List<Inoutlist> getPageList(int param1,int param2);
	
	/**根据名称删除收支信息*/
	public void deleteByName(String name);
	
	/**根据名称获取最大ID*/
	public Integer getMaxId(String name);
	
	/**根据Id获取账户余额*/
	public double getSumById(Integer listId);
	
	/**根据账户删除所有*/
	public void deleteL(String name);
	
	/**根据日期查询所有*/
	public List<Inoutlist> getListByDate(String date);
	
	/**根据账户人和收支类型查询收支详情总和*/
	public Double getSum(String param1,String param2);
	
	/**根据收支类型查询全部收支金额详情*/
	public Double getSum1(String type);
	
	/**根据年份或月份和收支类型查询总金额*/
	public Double getYearSum(String param1,String param2);
	
	/**年度报表、月度报表*/
	public List<Inoutlist> getYearMonth(String name);

}
