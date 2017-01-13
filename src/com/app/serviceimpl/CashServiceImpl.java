package com.app.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CashMapper;
import com.app.entity.Cash;
import com.app.service.CashService;

import net.sf.json.JSONObject;

@Service("CashServiceImpl")
public class CashServiceImpl implements CashService{
	@Autowired
	public CashMapper cashMapper;
	
	@Override
	public List<Cash> getCash(){
		return cashMapper.getCash();
	}
	
	@Override
	public int getCount(){
		return this.getCash().size();	
	}
	
	@Override
	public List<Cash> getPageCash(int start,int limit){
		List<Cash> list = cashMapper.getPageCash(start, limit);
		return list;
	}
	
	@Override
	public String getPageCashJson(int start,int limit){
		List<Cash> list = this.getPageCash(start, limit);
		return PageListToJson(list);
	}
	
	@Override
	public String PageListToJson(List<Cash> list){
		JSONObject obj=new JSONObject();
		int count=this.getCount();
		obj.put("totalCount", count);
		obj.put("rows", list);
		return obj.toString();
	}
	
	@Override
	public void addCash(Cash cash){
		  cashMapper.addCash(cash);
	}
	
	@Override
	public void updateCash(Cash cash){
		cashMapper.updateCash(cash);
	}
	
	@Override
	public void deleteCashList(List<Integer> idList){
		cashMapper.deleteCash(idList);
	}
	
	@Override
	public List<String> getCByName(String name){
		return cashMapper.getCByName(name);
	}
	
	@Override
	public String getNameById(Integer id){
		return cashMapper.getNameById(id);
	}
}
