package com.app.serviceimpl;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.app.dao.InoutlistMapper;
import com.app.dao.TypesMapper;
import com.app.entity.Inoutlist;
import com.app.service.InoutlistService;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonObjectFormatVisitor;

import net.sf.json.JSONObject;

@Service("InoutlistServiceImpl")
public class InoutlistServiceImpl implements InoutlistService{

	@Autowired
	public InoutlistMapper inoutlistMapper;
	@Autowired
	public TypesMapper typesMapper;
	
	@Override
	public List<Inoutlist> getList(){
		return inoutlistMapper.getList();
	}
	
	@Override
	public List<Inoutlist> getListByName(String name){
		return inoutlistMapper.getListByName(name);
	}
	
	
	@Override
	public void addList(Inoutlist list){
		  inoutlistMapper.addList(list);
	}
	
	@Override
	public void updateList(Inoutlist list){
		inoutlistMapper.updateList(list);
	}
	
	@Override
	public void deleteListList(List<Integer> idList){
		inoutlistMapper.deleteList(idList);
	}
	
	@Override
	public int getCount(){
		return this.getList().size();	
	}
	
	@Override
	public List<Inoutlist> getPageList(int start,int limit){
		List<Inoutlist> list = inoutlistMapper.getPageList(start, limit);
		return list;
	}
	
	@Override
	public String getPageListJson(int start,int limit){
		List<Inoutlist> list = this.getPageList(start, limit);
		return PageListToJson(list);
	}
	
	@Override
	public String PageListToJson(List<Inoutlist> list){
		JSONObject obj=new JSONObject();
		int count=this.getCount();
		obj.put("totalCount", count);
		obj.put("rows", list);
		return obj.toString();
	}
	
	@Override
	public double getSumByName(String name){
		int id = inoutlistMapper.getMaxId(name);
		return inoutlistMapper.getSumById(id);
	}
	
	@Override
	public void deleteL(String name){
	    inoutlistMapper.deleteL(name);
	}
	
	@Override
	public List<Inoutlist> getListByDate(String date){
		return inoutlistMapper.getListByDate(date);
	}
	
	@Override
	public String getChart(String mName,String tName){
		List<String> flags = typesMapper.getFlag(tName);
		int count = flags.size();
		JSONArray array=new JSONArray();
		for(int i=0;i<count;i++){
			Double m = inoutlistMapper.getSum(mName, flags.get(i));
			if(m!=null){
				JSONObject o = new JSONObject();
				o.put("type", flags.get(i));
				o.put("sum", m);
				array.add(o);
			}						
		}
		JSONObject obj = new JSONObject();
		obj.put("totalCount", count);
		obj.put("rows", array);
		return obj.toString();
	}
	
	@Override
	public String getChart1(String tName){
		List<String> flags = typesMapper.getFlag(tName);
		int count = flags.size();
		JSONArray array=new JSONArray();
		for(int i=0;i<count;i++){
			Double m = inoutlistMapper.getSum1(flags.get(i));
			if(m!=null){
				JSONObject o = new JSONObject();
				o.put("type", flags.get(i));
				o.put("sum", m);
				array.add(o);
			}
		}
		JSONObject obj = new JSONObject();
		obj.put("totalCount", count);
		obj.put("rows", array);
		return obj.toString();
	}
	
	@Override
	public List<Inoutlist> getYearMonth(String name){
		return inoutlistMapper.getYearMonth(name);
	}
	
	@Override
	public Double getYearSum(String year,String type){
		return inoutlistMapper.getYearSum(year, type);
	}
	
	@Override
	public JSONObject getCenter(Integer year){
		String lastyear = Integer.toString(year-1);
		lastyear = lastyear+"-__-__";
		String thisyear = Integer.toString(year);
		thisyear = thisyear+"-__-__";
		String all = "____-__-__";
		Double lastS = inoutlistMapper.getYearSum("收入",lastyear);
		Double lastZ = inoutlistMapper.getYearSum("支出",lastyear);
		Double lastSum = lastS - lastZ;
		Double thisS = inoutlistMapper.getYearSum("收入",thisyear);
		Double thisZ = inoutlistMapper.getYearSum("支出",thisyear);
		Double thisSum = thisS - thisZ;
		Double allS = inoutlistMapper.getYearSum("收入",all);
		Double allZ = inoutlistMapper.getYearSum("支出",all);
		Double allSum = allS - allZ;
		JSONObject obj = new JSONObject();
		obj.put("lastZ", lastZ);
		obj.put("lastS", lastS);
		obj.put("lastSum", lastSum);
		obj.put("thisS", thisS);
		obj.put("thisZ", thisZ);
		obj.put("thisSum", thisSum);
		obj.put("allS", allS);
		obj.put("allZ", allZ);
		obj.put("allSum", allSum);
		return obj;
		
	}
}
