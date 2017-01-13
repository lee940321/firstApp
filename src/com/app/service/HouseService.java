package com.app.service;

import java.util.List;

import com.app.entity.House;

public interface HouseService {

public List<House> getHouse();
	
	public int getCount();
	
	public List<House> getPageHouse(int start,int list);
	
    public String getPageHouseJson(int start,int list);
	
	public String PageListToJson(List<House> list);
	
	/** 添加用户 */
	public void addHouse(House house);
	
	/**更新用户*/
	public void updateHouse(House house);
	
	/**删除用户*/
	public void deleteHouseList(List<Integer> idList);
	
	public List<House> getHouseByName(String name);
}
