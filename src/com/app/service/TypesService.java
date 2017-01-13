package com.app.service;

import java.util.List;

import com.app.entity.Types;

public interface TypesService {

	public List<Types> getType();

	public Types getTypeByName(String Name);
	
	public void addType(Types types);
	
	public void updateType(Types types);

	public void deleteTypeList(List<Integer> idList);
	
	public int getCount();
	
	public List<Types> getPageType(int start,int list);
	
	public String getPageTypeJson(int start,int list);
	
	public String PageListToJson(List<Types> list);
	

	/**下拉框1*/
	public List<Types> getType1();
	
	/**下拉框2级*/
	public List<Types> getType2(String name);
	
}
