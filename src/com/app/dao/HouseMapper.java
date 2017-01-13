package com.app.dao;

import java.util.List;

import com.app.entity.House;

public interface HouseMapper {

public List<House> getHouse();
	/**分页查询资产信息*/
	public List<House> getPageHouse(int param1,int param2);
	
	/**添加资产信息*/
	public void addHouse(House house);
	
	/**更新资产信息*/
	public void updateHouse(House house);
	
	/**批量删除资产信息*/
	public void deleteHouse(List<Integer> idList);
	
	/**根据名称查询资产信息*/
	public List<House> getHouseByName(String name);
}
