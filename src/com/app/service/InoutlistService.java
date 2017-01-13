package com.app.service;

import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.app.entity.Inoutlist;

import net.sf.json.JSONObject;


public interface InoutlistService {

	/** 显示所有信息*/
	public List<Inoutlist> getList();
	
	/** 根据名称查询*/
	public List<Inoutlist> getListByName(String Name);
		
	/** 添加 */
	public void addList(Inoutlist list);
	
	/** 更新*/
	public void updateList(Inoutlist list);
	
	/** 删除*/
	public void deleteListList(List<Integer> idList);
	
	/** 信息总条数*/
	public int getCount();
	
	/** 分页显示——entity对象*/
	public List<Inoutlist> getPageList(int start,int list);
	
	/** 分页显示——json转String格式*/
	public String getPageListJson(int start,int list);
	
	/** 分页显示——根据对象查询*/
	public String PageListToJson(List<Inoutlist> list);
	
	/** 根据名称查询余额*/
	public double getSumByName(String name);
	
	/** 根据名称删除*/
	public void deleteL(String name);
	
	/**根据日期查询所有*/
	public List<Inoutlist> getListByDate(String date);

	/**根据用户名和收支类型查询*/
	public String getChart(String mName,String tName);
	
	/**根据收支类型查询收支详情*/
	public String getChart1(String tName);
	
	/**根据年度、月度产生报表*/
	public List<Inoutlist> getYearMonth(String name);
	
	/**根据时间区间和收支类型产生总金额*/
	public Double getYearSum(String year,String type);
	
	/**首页显示业务*/
	public JSONObject getCenter(Integer year);
}
