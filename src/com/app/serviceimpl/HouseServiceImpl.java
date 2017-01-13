package com.app.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.HouseMapper;
import com.app.entity.House;
import com.app.service.HouseService;

import net.sf.json.JSONObject;

@Service("HouseServiceImpl")
public class HouseServiceImpl implements HouseService{

	@Autowired
	HouseMapper houseMapper;
	
	@Override
	public List<House> getHouse(){
		return houseMapper.getHouse();
	}
	
	@Override
	public int getCount(){
		return this.getHouse().size();	
	}
	
	@Override
	public List<House> getPageHouse(int start,int limit){
		List<House> list = houseMapper.getPageHouse(start, limit);
		return list;
	}
	
	@Override
	public String getPageHouseJson(int start,int limit){
		List<House> list = this.getPageHouse(start, limit);
		return PageListToJson(list);
	}
	
	@Override
	public String PageListToJson(List<House> list){
		JSONObject obj=new JSONObject();
		int count=this.getCount();
		obj.put("totalCount", count);
		obj.put("rows", list);
		return obj.toString();
	}
	
	@Override
	public void addHouse(House house){
		houseMapper.addHouse(house);
	}
	
	@Override
	public void updateHouse(House house){
		houseMapper.updateHouse(house);
	}
	
	@Override
	public void deleteHouseList(List<Integer> idList){
		houseMapper.deleteHouse(idList);
	}
	
	@Override
	public List<House> getHouseByName(String name){
		return houseMapper.getHouseByName(name);
	}
}
